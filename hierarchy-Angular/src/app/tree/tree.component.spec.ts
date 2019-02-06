import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
/**
 * Load the implementations that should be tested
 */
import { TreeComponent } from './tree.component';
import { NodesListService } from './services/nodesList.service';
import { DataProviderService } from '../services/data-provider-service';

describe(`Tree`, () => {
    let comp: TreeComponent;
    let fixture: ComponentFixture<TreeComponent>;

    /**
     * async beforeEach
     */
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TreeComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [NodesListService, DataProviderService]
        })
            /**
             * Compile template and css
             */
            .compileComponents();
    }));

    /**
     * Synchronous beforeEach
     */
    beforeEach(() => {
        fixture = TestBed.createComponent(TreeComponent);
        comp = fixture.componentInstance;

        /**
         * Trigger initial data binding
         */
        fixture.detectChanges();
    });

    it(`should be readly initialized`, () => {
        expect(fixture).toBeDefined();
        expect(comp).toBeDefined();
    });

    it(`should have properties`, () => {
        expect(comp.newNode).toBeDefined();
        expect(comp.onmousedown).toBeDefined();
        expect(comp.onmousemove).toBeDefined();
        expect(comp.onmouseup).toBeDefined();
        expect(comp.makeTransform).toBeDefined();
        expect(comp.preventMouse).toBeDefined();
        expect(comp.onmousewheel).toBeDefined();
    });

});
