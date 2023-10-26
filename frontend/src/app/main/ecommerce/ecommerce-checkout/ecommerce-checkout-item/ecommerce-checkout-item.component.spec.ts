import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceCheckoutItemComponent } from './ecommerce-checkout-item.component';

describe('EcommerceCheckoutItemComponent', () => {
    let component: EcommerceCheckoutItemComponent;
    let fixture: ComponentFixture<EcommerceCheckoutItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EcommerceCheckoutItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EcommerceCheckoutItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});