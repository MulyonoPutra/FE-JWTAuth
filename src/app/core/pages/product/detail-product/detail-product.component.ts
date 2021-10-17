import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  product!: Product;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.productService.detail(id).subscribe(
      (data) => {
        this.product = data;
      },
      (err) => {
        this.toast.failed(err);
        this.goBack();
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/list']);
  }
}
