<mat-toolbar class="justify-between max-w-9xl mx-auto border-x">
    <a routerLink="home">My Store</a>
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon [matBadge]='1'matBadgeColor="warn">shopping_cart</mat-icon>
</button>
<mat-menu #menu="matMenu">
    <div class="p-3 devide-y divide-solide">
        <div class="pb-3 flex justify-between"> 
            <span class="mr-16">1 items</span>
            <a routerLinks="cart">View cart</a>
        </div>
        <div class="py-3">
    	<div class="flex justify-between py-3 font-light">
        Total:
        <span class="font-bold">{{ '450'| currency }}</span>
    	</div>
	</div>
    	<div class="pt-3 flex justify-between">
        <button class="bg-rose-600 text-white rounded-full w-9 h-9">
            <mat-icon>remove_shopping_cart</mat-icon>
        </button>
        <button routerLinks="cart" class="bg-green-600 text-white rounded-full w-9 h-9">
            <mat-icon>remove_shopping_cart</mat-icon>
        </button>


    </div>


    </div>
</mat-menu>
</mat-toolbar>