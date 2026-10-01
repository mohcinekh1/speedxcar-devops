import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize, timeout } from 'rxjs';

import { Car } from '../../../../models/car.model';
import { CarService } from '../../../../core/services/car.service';

@Component({
  selector: 'app-car-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './car-form.html',
  styleUrl: './car-form.css',
})
export class CarForm implements OnInit {
  carForm: FormGroup;
  carId: number | null = null;
  isEditMode = false;
  isLoading = false;
  errorMessage = '';
  readonly fallbackImage = '/assets/images/cars/SEDAN/sedan1.jpg';
  readonly imageOptions = [
    { label: 'Sedan 1', value: '/assets/images/cars/SEDAN/sedan1.jpg' },
    { label: 'Sedan 2', value: '/assets/images/cars/SEDAN/sedan2.jpg' },
    { label: 'Sedan 3', value: '/assets/images/cars/SEDAN/sedan3.jpg' },
    { label: 'Cabriolet 1', value: '/assets/images/cars/CABRIOLET/cabriolet1.jpg' },
    { label: 'Cabriolet 2', value: '/assets/images/cars/CABRIOLET/cabriolet2.jpg' },
    { label: 'Cabriolet 3', value: '/assets/images/cars/CABRIOLET/cabriolet3.jpg' },
    { label: 'Sport 1', value: '/assets/images/cars/SPORT/sport1.jpg' },
    { label: 'Sport 2', value: '/assets/images/cars/SPORT/sport2.jpg' },
    { label: 'Sport 3', value: '/assets/images/cars/SPORT/sport3.jpg' },
    { label: 'SUV 1', value: '/assets/images/cars/SUV/suv-1.jpg' },
    { label: 'SUV 2', value: '/assets/images/cars/SUV/suv-2.jpg' },
    { label: 'SUV 3', value: '/assets/images/cars/SUV/suv-3.jpg' },
    { label: 'Minivan 1', value: '/assets/images/cars/MINIVAN/minivan1.jpg' },
    { label: 'Minivan 2', value: '/assets/images/cars/MINIVAN/minivan2.jpg' },
    { label: 'Minivan 3', value: '/assets/images/cars/MINIVAN/minivan3.jpg' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private cdr: ChangeDetectorRef
  ) {
    this.carForm = this.fb.group({
      brand: ['', [Validators.required, Validators.minLength(2)]],
      model: ['', [Validators.required, Validators.minLength(1)]],
      category: ['', [Validators.required]],
      pricePerDay: ['', [Validators.required]],
      gearBox: ['', [Validators.required]],
      fuel: ['', [Validators.required]],
      doors: [2, [Validators.required, Validators.min(1)]],
      seats: [4, [Validators.required, Validators.min(1)]],
      imageUrl: ['', [Validators.required]],
      available: [true]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.carId = Number(id);
    this.isEditMode = true;
    this.loadCar(this.carId);
  }

  loadCar(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.carService.getCarById(id).pipe(
      timeout(10000),
      finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (car) => {
        this.carForm.patchValue({
          ...car,
          imageUrl: this.getImageUrl(car.imageUrl)
        });
      },
      error: (error) => {
        this.errorMessage = this.getBackendErrorMessage(error, 'Erreur lors du chargement de la voiture.');
      }
    });
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.carForm.invalid) {
      this.carForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const car = this.buildCarRequest();

    if (this.isEditMode && this.carId !== null) {
      this.updateCar(this.carId, car);
      return;
    }

    this.createCar(car);
  }

  createCar(car: Car): void {
    this.carService.createCar(car).pipe(
      timeout(10000),
      finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.router.navigate(['/admin/cars'], {
          state: { successMessage: 'Voiture ajoutee avec succes.' }
        });
      },
      error: (error) => {
        this.errorMessage = this.getBackendErrorMessage(error, 'Erreur lors de l ajout de la voiture.');
      }
    });
  }

  updateCar(id: number, car: Car): void {
    this.carService.updateCar(id, car).pipe(
      timeout(10000),
      finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.router.navigate(['/admin/cars'], {
          state: { successMessage: 'Voiture modifiee avec succes.' }
        });
      },
      error: (error) => {
        this.errorMessage = this.getBackendErrorMessage(error, 'Erreur lors de la modification de la voiture.');
      }
    });
  }

  selectImage(imageUrl: string): void {
    this.carForm.patchValue({ imageUrl });
    this.imageUrl?.markAsTouched();
  }

  getImageUrl(imageUrl: string | null | undefined): string {
    if (!imageUrl) {
      return this.fallbackImage;
    }

    return imageUrl;
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    if (image.src.includes(this.fallbackImage)) {
      return;
    }

    image.src = this.fallbackImage;
  }

  private buildCarRequest(): Car {
    const formValue = this.carForm.value;

    return {
      brand: formValue.brand.trim(),
      model: formValue.model.trim(),
      category: formValue.category,
      pricePerDay: String(formValue.pricePerDay),
      gearBox: formValue.gearBox,
      fuel: formValue.fuel,
      doors: Number(formValue.doors),
      seats: Number(formValue.seats),
      imageUrl: this.getImageUrl(formValue.imageUrl).trim(),
      available: Boolean(formValue.available)
    };
  }

  private getBackendErrorMessage(error: any, fallbackMessage: string): string {
    if (error.name === 'TimeoutError') {
      return 'La requete prend trop de temps. Verifie que le backend repond sur le port 8080.';
    }

    if (error.status === 401 || error.status === 403) {
      return 'Acces refuse. Reconnecte-toi avec le compte admin.';
    }

    if (error.status === 0) {
      return 'Backend non lance. Demarre Spring Boot sur le port 8080.';
    }

    return error.error?.message || fallbackMessage;
  }

  get brand() {
    return this.carForm.get('brand');
  }

  get model() {
    return this.carForm.get('model');
  }

  get category() {
    return this.carForm.get('category');
  }

  get pricePerDay() {
    return this.carForm.get('pricePerDay');
  }

  get gearBox() {
    return this.carForm.get('gearBox');
  }

  get fuel() {
    return this.carForm.get('fuel');
  }

  get doors() {
    return this.carForm.get('doors');
  }

  get seats() {
    return this.carForm.get('seats');
  }

  get imageUrl() {
    return this.carForm.get('imageUrl');
  }
}
