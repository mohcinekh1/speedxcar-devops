import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Car } from '../../../../models/car.model';

@Component({
  selector: 'app-vehicle-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './vehicle-card.html',
  styleUrl: './vehicle-card.css',
})
export class VehicleCard {
  @Input() car!: Car;

  readonly fallbackImage = '/assets/images/cars/SEDAN/sedan1.png';
  private readonly suvImages = [
    '/assets/images/cars/SUV/suv-1.png',
    '/assets/images/cars/SUV/suv-2.png',
    '/assets/images/cars/SUV/suv-3.png'
  ];

  get hasCustomCarImage(): boolean {
    return this.isSuv || (this.car?.imageUrl?.startsWith('/assets/images/cars/') ?? false);
  }

  get imageUrl(): string {
    if (!this.car?.imageUrl) {
      if (this.isSuv) {
        return this.getSuvImage();
      }

      return this.fallbackImage;
    }

    if (this.isSuv && !this.car.imageUrl.startsWith('/assets/images/cars/SUV/')) {
      return this.getSuvImage();
    }

    return this.getTransparentImageUrl(this.car.imageUrl);
  }

  get isSuv(): boolean {
    return this.car?.category?.trim().toLowerCase() === 'suv';
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    if (image.src.endsWith('.png')) {
      image.src = image.src.replace(/\.png$/i, '.jpg');
      return;
    }

    if (image.src.includes(this.fallbackImage)) {
      return;
    }

    image.src = this.fallbackImage;
  }

  private getSuvImage(): string {
    const carId = this.car?.id ?? 1;
    const imageIndex = Math.abs(carId - 1) % this.suvImages.length;

    return this.suvImages[imageIndex];
  }

  private getTransparentImageUrl(imageUrl: string): string {
    if (!imageUrl.startsWith('/assets/images/cars/')) {
      return imageUrl;
    }

    return imageUrl.replace(/\.(jpg|jpeg)$/i, '.png');
  }
}
