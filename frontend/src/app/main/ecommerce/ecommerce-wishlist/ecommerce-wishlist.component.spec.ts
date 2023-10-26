import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceWishlistComponent } from './ecommerce-wishlist.component';

describe('EcommerceWishlistComponent', () => {
    let component: EcommerceWishlistComponent;
    let fixture: ComponentFixture<EcommerceWishlistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EcommerceWishlistComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EcommerceWishlistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});