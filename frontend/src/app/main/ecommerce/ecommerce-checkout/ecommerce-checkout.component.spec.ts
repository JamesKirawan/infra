import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceCheckoutComponent } from './ecommerce-checkout.component';

describe('EcommerceCheckoutComponent', () => {
    let component: EcommerceCheckoutComponent;
    let fixture: ComponentFixture<EcommerceCheckoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EcommerceCheckoutComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EcommerceCheckoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});