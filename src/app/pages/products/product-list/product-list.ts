
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import {FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Modal } from '../../../shared/components/modal/modal';
import { ProductService } from '../../../core/services/product';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule,Modal,ReactiveFormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {

  searchSubject = new Subject<string>();
  apiLoading = false;
    constructor(
      private productService: ProductService,
      private cdr: ChangeDetectorRef
    ) {

      this.searchSubject.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(searchText =>
          this.productService.searchProducts(searchText)
        )
      ).subscribe({
        next: (response) => {
          console.log('Search Results:', response.products);
        }
      });

    }
    apiProducts: any[] = [];

   
    apiError = '';

    searchText = '';

    currentPage = 1;
    pageSize = 10;
    totalProducts = 0;
    ngOnInit(): void {
      this.loadProducts();
    }

    loadProducts(): void {

        console.log('loadProducts started');

        this.apiLoading = true;
        this.apiError = '';

        const skip = (this.currentPage - 1) * this.pageSize;

        this.productService.getProductsFromApi(
          this.pageSize,
          skip,
          this.searchText
        )
        .pipe(
          finalize(() => {
            console.log('API request finished');
            this.apiLoading = false;
              this.apiLoading = false;

            console.log('Loading state:', this.apiLoading);
            console.log('Products count:', this.apiProducts.length);
            console.log('Total products:', this.totalProducts);
          })
        )
       .subscribe({

          next: (response) => {

            console.log('API Response:', response);

            this.apiProducts = response.products;
            this.totalProducts = response.total;

            this.apiLoading = false;

            this.cdr.detectChanges();

          },

          error: (error) => {

            console.error('API Error:', error);

            this.apiError = 'Unable to load products.';
            this.apiLoading = false;

            this.cdr.detectChanges();

          }

        });

    }

    /* ignore this is for testing purpose */
 products = [
    { id: 1, name: 'Nike Shoes', category: 'Footwear', price: 2499, stock: 20, status: 'Active' },
    { id: 2, name: 'Smart Watch', category: 'Electronics', price: 3999, stock: 15, status: 'Active' },
    { id: 3, name: 'T-Shirt', category: 'Clothing', price: 799, stock: 0, status: 'Out of Stock' }
  ];

  // 2. Search property

  // 3. Category property
  



  // 4. Categories getter
  

  searchProducts(): void {

    this.currentPage = 1;

    this.loadProducts();

  }

  // 6. Delete method
  deleteProduct(id: number) {
    this.products = this.products.filter(
      product => product.id !== id
    );
  }
  showModal = false;

 selectedCategory = '';

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  closeModal() {
    this.showModal = false;
  }

  editingProductId: number | null = null;

  openModal() {
    this.editingProductId = null;

    this.productForm.reset({
      name: '',
      category: '',
      price: 0,
      stock: 0
    });

    this.showModal = true;
  }

  editProduct(product: any) {
    this.editingProductId = product.id;

    this.productForm.patchValue({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock
    });

    this.showModal = true;
  }

  saveProduct() {

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = this.productForm.getRawValue();

    if (this.editingProductId !== null) {

      this.products = this.products.map(product =>
        product.id === this.editingProductId
          ? {
              ...product,
              name: formData.name ?? '',
              category: formData.category ?? '',
              price: formData.price ?? 0,
              stock: formData.stock ?? 0
            }
          : product
      );

    } else {

      const newProduct = {
        id: Math.max(0, ...this.products.map(p => p.id)) + 1,
        name: formData.name ?? '',
        category: formData.category ?? '',
        price: formData.price ?? 0,
        stock: formData.stock ?? 0,
        status: 'Active'
      };

      this.products.push(newProduct);
    }

    this.closeModal();
  }

  nextPage(): void {

    if (this.currentPage < this.totalPages) {

      this.currentPage++;

      this.loadProducts();

    }

  }

  previousPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.loadProducts();

    }

  }

  get totalPages(): number {

    return Math.ceil(this.totalProducts / this.pageSize);

  }

}
