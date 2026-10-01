import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, finalize, of, timeout } from 'rxjs';

import { VehicleCard } from '../../components/vehicle-card/vehicle-card';
import { Car } from '../../../../models/car.model';
import { CarService } from '../../../../core/services/car.service';
import { DEMO_CARS } from '../../../../data/demo-cars';

@Component({
  selector: 'app-vehicles',
  imports: [CommonModule, RouterLink, VehicleCard],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css',
})
export class Vehicles implements OnInit {
  readonly categories = ['All vehicles', 'Sedan', 'Cabriolet', 'Sport', 'SUV', 'Minivan'];
  readonly categoryIcons: Record<string, string> = {
    Sedan: '/assets/images/category-icons/sedan.png',
    Cabriolet: '/assets/images/category-icons/cabriolet.png',
    Sport: '/assets/images/category-icons/sport.png',
    SUV: '/assets/images/category-icons/suv.png',
    Minivan: '/assets/images/category-icons/minivan.png'
  };

  selectedCategory = 'All vehicles';
  cars: Car[] = [];
  isLoading = false;
  private readonly demoCars = DEMO_CARS;

  constructor(
    private carService: CarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  get filteredCars(): Car[] {
    if (this.selectedCategory === 'All vehicles') {
      return this.cars;
    }

    return this.cars.filter((car) => {
      const carCategory = car.category.toLowerCase();
      const selectedCategory = this.selectedCategory.toLowerCase();

      if (selectedCategory === 'minivan') {
        return carCategory === 'minivan' || carCategory === 'van';
      }

      return carCategory === selectedCategory;
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  getCategoryIcon(category: string): string | null {
    return this.categoryIcons[category] ?? null;
  }

  moveMagnet(
    event: PointerEvent,
    selector: string,
    radius: number,
    maxScale: number,
    lift: number
  ): void {
    const container = event.currentTarget as HTMLElement | null;

    if (!container) {
      return;
    }

    const items = Array.from(container.querySelectorAll<HTMLElement>(selector));

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - distance / radius);

      if (influence === 0) {
        item.style.transform = '';
        return;
      }

      const drift = (dx / Math.max(rect.width, 1)) * 10 * influence;
      const translateY = -lift * influence;
      const scale = 1 + (maxScale - 1) * influence;

      item.style.transform =
        `translate3d(${drift.toFixed(1)}px, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
    });
  }

  resetMagnet(event: PointerEvent, selector: string): void {
    const container = event.currentTarget as HTMLElement | null;

    if (!container) {
      return;
    }

    container
      .querySelectorAll<HTMLElement>(selector)
      .forEach((item) => item.style.transform = '');
  }

  trackByCarId(index: number, car: Car): number {
    return car.id ?? index;
  }

  private loadCars(): void {
    this.cars = this.demoCars;
    this.isLoading = true;

    this.carService.getPublicCars().pipe(
      timeout(2500),
      catchError(() => of([])),
      finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe((cars) => {
      if (cars.length) {
        this.cars = cars;
        this.cdr.detectChanges();
      }
    });
  }

}
