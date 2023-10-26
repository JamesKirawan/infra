import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginV2Component } from './auth-login-v2.component';

describe('AuthLoginV2Component', () => {
    let component: AuthLoginV2Component;
    let fixture: ComponentFixture<AuthLoginV2Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthLoginV2Component]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthLoginV2Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});