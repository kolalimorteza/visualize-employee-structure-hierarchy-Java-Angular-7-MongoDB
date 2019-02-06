import { Injectable } from '@angular/core';
import { TreeDiagramNodesList } from '../classes/nodesList.class';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data-service';

@Injectable()
export class NodesListService {
    private _nodesList: TreeDiagramNodesList;
    constructor(private _httpClient: HttpClient, private dataService: DataService) {

    }

    public loadNodes(nodes: any[], config) {
        this._nodesList = new TreeDiagramNodesList(nodes, config, this._httpClient, this.dataService);
        return this._nodesList;
    }

    public getNodes() {
        return this._nodesList.values();
    }

    public getNode(guid) {
        return guid && this._nodesList.getNode(guid);
    }

    public newNode() {
        this._nodesList.newNode();
    }

    public makerNode() {
        return this._nodesList.makerGuid;
    }

}
