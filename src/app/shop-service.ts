import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
export interface Product{
    id:number; 
    name:string; 
    price:number
}

@Injectable({ providedIn: 'root' })
export class ShopService {

    cart$= new BehaviorSubject<Product[]>(JSON.parse(localStorage.getItem("cart")??"[]")); 
    notify$=new Subject<string>(); 
    viewed$= new ReplaySubject<Product>(3)

    add(p:Product){
        this.cart$.next([...this.cart$.value, p])
        this.notify$.next(`${p.name} დაემატა კალათაში`)
    }

    remove(index:number){
        this.cart$.next(this.cart$.value.filter((_, i)=>i!==index))
    }
    view(p:Product){
        this.viewed$.next(p)
    }
    checkout(){
        const result$=new AsyncSubject<string>()
        result$.next("PENDING")

        setTimeout(() => {
            result$.next("order--"+ Math.floor(Math.random()*700+20))
            result$.complete()
            this.cart$.next([])
            
        }, 1500);
        return result$

    }

  }
