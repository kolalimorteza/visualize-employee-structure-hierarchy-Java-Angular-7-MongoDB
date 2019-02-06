import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TreeComponent } from './tree.component';
import { NodeComponent } from './node';
import { NodesListService } from './services/nodesList.service';
import { DataProviderService } from '../services/data-provider-service';

@NgModule({
    declarations: [
        /**
         * Components / Directives/ Pipes
         */
        TreeComponent,
        NodeComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TreeComponent,
        NodeComponent
    ],
    providers: [
        NodesListService,
        DataProviderService
    ]
})
export class TreeDiagram {

}
