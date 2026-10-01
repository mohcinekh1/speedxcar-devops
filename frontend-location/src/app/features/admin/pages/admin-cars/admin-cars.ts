import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize, timeout } from 'rxjs';

import { Car } from '../../../../models/car.model';
import { CarService } from '../../../../core/services/car.service';

@Component({
  selector: 'app-admin-cars',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-cars.html',
  styleUrl: './admin-cars.css',
})
export class AdminCars implements OnInit {
  cars: Car[] = [];
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  deletingCarId: number | null = null;
  readonly fallbackImage = '/assets/images/cars/SEDAN/sedan1.jpg';

  constructor(
    private carService: CarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.successMessage = history.state?.successMessage || '';
    this.loadCars();
  }

  get totalCars(): number {
    return this.cars.length;
  }

  get availableCars(): number {
    return this.cars.filter((car) => car.available).length;
  }

  get unavailableCars(): number {
    return this.cars.filter((car) => !car.available).length;
  }

  get averagePricePerDay(): string {
    if (this.cars.length === 0) {
      return '0 DH';
    }

    const total = this.cars.reduce((sum, car) => sum + Number(car.pricePerDay || 0), 0);
    return this.formatPrice(String(Math.round(total / this.cars.length)));
  }

  loadCars(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.carService.getAllCars().pipe(
      timeout(10000),
      finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (cars) => {
        this.cars = cars.sort((firstCar, secondCar) => (secondCar.id || 0) - (firstCar.id || 0));
      },
      error: (error) => {
        this.errorMessage = this.getLoadErrorMessage(error);
      }
    });
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

  deleteCar(id: number): void {
    if (!confirm('Voulez-vous supprimer cette voiture ?')) {
      return;
    }

    this.deletingCarId = id;
    this.errorMessage = '';

    this.carService.deleteCar(id).pipe(
      timeout(10000),
      finalize(() => {
        this.deletingCarId = null;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.successMessage = 'Voiture supprimee avec succes.';
        this.loadCars();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Erreur lors de la suppression.';
        this.cdr.detectChanges();
      }
    });
  }

  formatPrice(price: string): string {
    const amount = Number(price);

    if (Number.isNaN(amount)) {
      return `${price} DH`;
    }

    return `${new Intl.NumberFormat('fr-FR').format(amount)} DH`;
  }

  trackByCarId(index: number, car: Car): number {
    return car.id || index;
  }

  private getLoadErrorMessage(error: any): string {
    if (error.name === 'TimeoutError') {
      return 'La requete prend trop de temps. Verifie que le backend repond sur le port 8080.';
    }

    if (error.status === 401 || error.status === 403) {
      return 'Acces refuse. Reconnecte-toi avec le compte admin puis recharge la page.';
    }

    if (error.status === 0) {
      return 'Backend non lance. Demarre Spring Boot sur le port 8080.';
    }

    return error.error?.message || 'Erreur lors du chargement des voitures.';
  }
}
