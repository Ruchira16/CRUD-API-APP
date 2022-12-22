import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from './model/products';
import { ProductService } from './Service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ApiApp';

  allProducts: Product[];

  isFetching: boolean = false;

  editMode: boolean = false; 

  currentProductId: string;

  @ViewChild('productsForm') form: NgForm;

  constructor(private productService: ProductService){
    
  }

  ngOnInit() {
    this.fetchProducts();
  }

  onProductsFetch() {
    this.fetchProducts();
  }

  onProductCreate(products: {pName: string, desc: string, price: number}){

    if(!this.editMode){
      this.productService.createProduct(products);
    }else{
      this.productService.updateProduct(this.currentProductId, products);
    }

    
    
  }

  private fetchProducts(){
    this.isFetching = true;
    this.productService.fetchProduct().subscribe((products) => {
      this.allProducts = products;
      this.isFetching = false;
    });
    
  }

  onDeleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }

  onDeleteAllProducts() {
    this.productService.deleteAllProducts();
  }

  onEditClicked(id: string){

    this.currentProductId = id;
    //Get the product based on its ID
    let currentProduct = this.allProducts.find((p) => {
      return p.id === id
    });
   // console.log(currentProduct);
    
    //Populate the form with the product details

    //Set the value for the form control using setValue function
    this.form.setValue({
      pName: currentProduct.pName,
      desc: currentProduct.desc,    
      price: currentProduct.price,
    }); 

    //Change the button value to update the product
    this.editMode = true;

  }
}


