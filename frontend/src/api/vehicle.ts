// vehicle-list.component.ts
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { VehicleDTO } from '../models/vehicle.dto';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: VehicleDTO[] = [];
  loading = true;
  error: string | null = null;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe(
      (data) => {
        this.vehicles = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to fetch vehicles';
        this.loading = false;
      }
    );
  }
}