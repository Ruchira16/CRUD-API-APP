import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import  { map } from 'rxjs/operators';
import { Product } from "../model/products";

@Injectable({providedIn: 'root'})
export class ProductService{

    constructor(private http: HttpClient){

    }

    //create product in database
    createProduct(products: {pName: string, desc: string, price: number}){
        console.log(products);
        const headers = new HttpHeaders({'myHeader' : 'ApiLearning'});
        this.http.post<{name: string}>('https://apiapp-bb202-default-rtdb.firebaseio.com/products.json', 
        products, {headers:headers})
        .subscribe((res) => {
        console.log(res);
        });
    }

    //fetch product from database
    fetchProduct() {

        return this.http.get<{[key: string]: Product}>('https://apiapp-bb202-default-rtdb.firebaseio.com/products.json')
        .pipe(map((res) => {
        const products = [];
        for(const key in res){
            if(res.hasOwnProperty(key)){
            products.push({...res[key], id: key})
            }
        }
        return products;
        }))

    }

    //delete product from database
    deleteProduct(id: string) {

        this.http.delete('https://apiapp-bb202-default-rtdb.firebaseio.com/products/'+id+'.json')
        .subscribe();

    }

    //delete all products from database
    deleteAllProducts(){
        this.http.delete('https://apiapp-bb202-default-rtdb.firebaseio.com/products.json')
        .subscribe();
    }

    updateProduct(id: string, value: Product){
        this.http.put('https://apiapp-bb202-default-rtdb.firebaseio.com/products/'+id+'.json', value)
        .subscribe();
    }
}
