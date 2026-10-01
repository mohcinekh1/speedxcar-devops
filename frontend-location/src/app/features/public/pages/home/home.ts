import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, of, timeout } from 'rxjs';

import { VehicleCard } from '../../components/vehicle-card/vehicle-card';
import { Car } from '../../../../models/car.model';
import { CarService } from '../../../../core/services/car.service';
import { DEMO_CARS } from '../../../../data/demo-cars';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, VehicleCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  bookingForm: FormGroup;
  bookingMessage = '';

  carTypes = ['Sedan', 'SUV', 'Sport', 'Cabriolet', 'Minivan'];
  popularCars: Car[] = DEMO_CARS.slice(0, 6);

  readonly features = [
    {
      title: 'Availability',
      text: 'Find ready cars quickly for daily travel and weekend plans.',
      icon: '/assets/images/category-icons/suv.png'
    },
    {
      title: 'Comfort',
      text: 'Choose clean, comfortable vehicles adapted to your road.',
      icon: '/assets/images/category-icons/sedan.png'
    },
    {
      title: 'Savings',
      text: 'Compare prices and reserve the option that fits your budget.',
      icon: '/assets/images/category-icons/sport.png'
    }
  ];

  readonly steps = [
    'Choose your destination and rental dates.',
    'Compare available cars by category and price.',
    'Confirm your booking details in a few clicks.',
    'Pick up the car and enjoy the road.'
  ];

  stats = [
    { value: '540+', label: 'Cars' },
    { value: '20k+', label: 'Customers' },
    { value: '25+', label: 'Years' },
    { value: '20m+', label: 'Miles' }
  ];

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private cdr: ChangeDetectorRef
  ) {
    this.bookingForm = this.fb.group({
      carType: ['', Validators.required],
      rentalPlace: ['', Validators.required],
      returnPlace: ['', Validators.required],
      rentalDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadHomeData();
  }

  onBookCar(): void {
    this.bookingMessage = '';

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.bookingMessage = 'Reservation frontend prete. Backend apres.';
  }

  trackByCarId(index: number, car: Car): number {
    return car.id ?? index;
  }

  private loadHomeData(): void {
    this.carService.getHomeData().pipe(
      timeout(2500),
      catchError(() => of(null))
    ).subscribe((homeData) => {
      if (!homeData) {
        return;
      }

      if (homeData.featuredCars.length) {
        this.popularCars = homeData.featuredCars;
      }

      if (homeData.stats.length) {
        this.stats = homeData.stats;
      }

      if (homeData.categories.length) {
        this.carTypes = homeData.categories.map((category) => category.name);
      }

      this.cdr.detectChanges();
    });
  }
}
