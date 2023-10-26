import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceShopComponent } from './ecommerce-shop.component';

describe('EcommerceShopComponent', () => {
    let component: EcommerceShopComponent;
    let fixture: ComponentFixture<EcommerceShopComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EcommerceShopComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EcommerceShopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});