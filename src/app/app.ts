import { Component, signal,inject, computed, effect } from '@angular/core';
import { RecentlyViewed } from './recently-viewed/recently-viewed';
import { Product, ShopService } from './shop-service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';



@Component({
  selector: 'app-root',
  imports: [RecentlyViewed],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('work22');
  private shop = inject(ShopService)


  products  = [
    { id: 1, name: 'ლეპტოპი', price: 1500 },
    { id: 2, name: 'მაუსი', price: 50 },
    { id: 3, name: 'კლავიატურა', price: 120 },
    { id: 4, name: 'ყურსასმენი', price: 200 },
  ];

  cartOpen = signal(false);
  viewedOpen = signal(false);
  paying = signal(false);
  toast = signal('');
  private toastTimer?: ReturnType<typeof setTimeout>;

 cart = toSignal(this.shop.cart$ ,{requireSync:true})
 count = computed(()=>this.cart().length)
 total = computed(()=>this.cart().reduce((sum,p)=>sum+p.price,0))
//  აქამდე დავწერე კლასში




constructor(){
  this.shop.notify$.pipe(takeUntilDestroyed()).subscribe((message=>this.showToast(message)))
  effect(()=>localStorage.setItem('cart',JSON.stringify(this.cart())))

}

private showToast(message: string) {
  clearTimeout(this.toastTimer)
  this.toast.set(message)
  this.toastTimer = setTimeout(() => this.toast.set(''), 2000)
}

add(p: Product) { this.shop.add(p); }
remove(i: number) { this.shop.remove(i); }
view(p: Product) { this.shop.view(p); }


pay(){
  this.paying.set(true)
  this.shop.checkout().subscribe({
    next:()=>{},
    complete:()=>{
      this.paying.set(false)
      this.cartOpen.set(false)
      this.showToast('შეკვეთა მიღებულია')
    }

  })
}



}
