import { Component, inject } from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop'
import { ShopService } from '../shop-service';
import { scan } from 'rxjs';
 @Component({
  imports: [],
  selector: 'app-recently-viewed',
  styleUrl: './recently-viewed.css',
  templateUrl: './recently-viewed.html',
})
export class RecentlyViewed {
  items=toSignal(
    inject(ShopService).viewed$.pipe(
      scan((all, p)=>[...all, p], [] as {name:string}[])
    ),
    {
      initialValue:[] as {name:string}[]
    }
  )

}
