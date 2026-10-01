import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, finalize, of, timeout } from 'rxjs';

import { Car } from '../../../../models/car.model';
import { VehicleCard } from '../../components/vehicle-card/vehicle-card';
import { CarService } from '../../../../core/services/car.service';
import { DEMO_CARS } from '../../../../data/demo-cars';

interface DetailSpec {
  label: string;
  value: string;
  icon: 'gear' | 'fuel' | 'doors' | 'conditioner' | 'seats' | 'distance';
}

@Component({
  selector: 'app-car-details',
  imports: [CommonModule, RouterLink, VehicleCard],
  templateUrl: './car-details.html',
  styleUrl: './car-details.css',
})
export class CarDetails implements OnInit {
  car: Car = DEMO_CARS[0];
  cars: Car[] = DEMO_CARS;
  rentMessage = '';

  readonly equipment = ['ABS', 'Air Bags', 'Cruise Control', 'Air Conditioner', 'Parking Sensors', 'Bluetooth'];

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.scrollToTop();
      this.loadCar(id);
    });
  }

  get specs(): DetailSpec[] {
    return [
      { label: 'Gear Box', value: this.car.gearBox, icon: 'gear' },
      { label: 'Fuel', value: this.car.fuel, icon: 'fuel' },
      { label: 'Doors', value: String(this.car.doors), icon: 'doors' },
      { label: 'Air Conditioner', value: 'Yes', icon: 'conditioner' },
      { label: 'Seats', value: String(this.car.seats), icon: 'seats' },
      { label: 'Distance', value: '500', icon: 'distance' }
    ];
  }

  get galleryImages(): string[] {
    const sameCategoryImages = this.cars
      .filter((item) => this.isSameCategory(item.category, this.car.category))
      .map((item) => item.imageUrl);

    return Array.from(new Set([this.car.imageUrl, ...sameCategoryImages])).slice(0, 3);
  }

  get otherCars(): Car[] {
    return this.cars.filter((item) => item.id !== this.car.id).slice(0, 6);
  }

  rentCar(): void {
    this.rentMessage = 'Reservation frontend prete. Backend apres.';
  }

  trackByCarId(index: number, car: Car): number {
    return car.id ?? index;
  }

  private loadCar(id: number): void {
    const fallbackCar = this.findCarById(DEMO_CARS, id) ?? DEMO_CARS[0];

    this.rentMessage = '';
    this.cars = DEMO_CARS;
    this.car = fallbackCar;

    this.carService.getPublicCarById(id).pipe(
      timeout(2500),
      catchError(() => of(null)),
      finalize(() => this.cdr.detectChanges())
    ).subscribe((car) => {
      if (car) {
        this.car = car;
      }
    });

    this.carService.getPublicCars().pipe(
      timeout(2500),
      catchError(() => of([])),
      finalize(() => this.cdr.detectChanges())
    ).subscribe((cars) => {
      if (!cars.length) {
        return;
      }

      this.cars = cars;
      this.car = this.findCarById(cars, id) ?? fallbackCar;
    });
  }

  private findCarById(cars: Car[], id: number): Car | undefined {
    if (!Number.isFinite(id)) {
      return undefined;
    }

    return cars.find((item) => Number(item.id) === id);
  }

  private isSameCategory(firstCategory: string, secondCategory: string): boolean {
    return firstCategory.trim().toLowerCase() === secondCategory.trim().toLowerCase();
  }

  private scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
