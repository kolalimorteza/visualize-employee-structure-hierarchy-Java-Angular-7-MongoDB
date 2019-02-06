import { TreeDiagramNode } from './node.class';
import { TreeDiagramNodeMaker } from './node-maker.class';
import { Injectable } from '@angular/core';
import { range } from 'rxjs';

@Injectable()
export class TreeDiagramNodesList {
    public roots: TreeDiagramNode[];
    public makerGuid: string;
    public draggingNodeGuid;
    private _nodesList = new Map();
    private _nodeTemplate = {
        displayName: 'New node',
        email: 'dummy@gmail.com',
        address: 'address goes here',
        companyName: 'company name',
        city: 'city',
        role: 'role',
        sign: false,
        children: [],
        guid: '',
        parentId: null
    };

    constructor(_nodes: any[], private config, private _httpClient, private dataService) {

        _nodes.forEach(_node => {
            this._nodesList.set(_node.guid, new TreeDiagramNode(_node, config, this.getThisNodeList.bind(this)));
        });
        this._makeRoots();

        this.makerGuid = this.uuidv4();
        const node = {
            guid: this.makerGuid,
            parentId: 'root',
            children: [],
            email: 'dummy@gmail.com',
            address: 'address goes here',
            companyName: 'company name',
            city: 'city',
            role: 'role',
            sign: false,
            displayName: 'New node'
        };
        const maker = new TreeDiagramNodeMaker(node, this.config, this.getThisNodeList.bind(this));
        this._nodesList.set(this.makerGuid, maker);
        this.dataService.currentMessage.subscribe(message => {
            console.log('subscribed ' + message);
            this._nodesList.forEach((data) => {
                if (data.displayName === message) {
                    console.log('node found ' + data._toggle);
                    data._toggle = true;
                    this.toggleSiblings(data.guid);
                }
            });
        });
    }

    public values() {
        return this._nodesList.values();
    }

    public getNode(guid: string): TreeDiagramNode {
        return this._nodesList.get(guid);
    }

    public rootNode(guid: string) {
        const node = this.getNode(guid);
        node.isDragging = false;
        node.isDragover = false;
        if (node.parentId) {
            const parent = this.getNode(node.parentId);
            parent.children.delete(guid);
        }
        node.parentId = null;
        this._makeRoots();
        const maker = this.getNode(this.makerGuid);
        maker.isDragging = false;
        maker.isDragover = false;
    }

    public transfer(origin: string, target: string) {
        const _origin = this.getNode(origin);
        const _target = this.getNode(target);
        _origin.isDragover = false;
        _origin.isDragging = false;
        _target.isDragover = false;
        if (_origin.parentId === target || origin === target) {
            return;
        }
        const remakeRoots = _origin.isRoot();
        if (_origin.parentId) {
            const _parent = this.getNode(_origin.parentId);
            _parent.children.delete(origin);
            if (!_parent.hasChildren()) {
                _parent.toggle(false);
            }
        }
        _target.children.add(origin);

        _origin.parentId = target;
        remakeRoots && this._makeRoots();

        this.serialize();
    }

    public getThisNodeList() {
        return this;
    }

    public toggleSiblings(guid: string) {
        const target = this.getNode(guid);
        if (target.parentId) {
            const parent = this.getNode(target.parentId);
            parent.children.forEach((nodeGuid) => {
                if (nodeGuid === guid) {
                    return;
                }
                this.getNode(nodeGuid).toggle(false);
            });
        } else {
            for (const root of this.roots) {
                if (root.guid === guid) {
                    continue;
                }
                root.toggle(false);
            }
        }
    }

    public serialize() {
        const out = [];
        this._nodesList.forEach((node: TreeDiagramNode) => {
            const json: any = {
                guid: node.guid,
                displayName: node.displayName,
                parentId: node.parentId
            };
            json.children = Array.from(node.children);

            out.push(json);
        });
        return out;
    }

    public destroy(guid: string) {
        const target = this.getNode(guid);
        if (target.parentId) {
            const parent = this.getNode(target.parentId);
            parent.children.delete(guid);
        }
        if (target.hasChildren()) {
            target.children.forEach((child: string) => {
                const theNode = this.getNode(child);
                console.log(theNode.displayName);
                theNode.parentId = target.parentId;
                if (target.parentId) {
                    const parent = this.getNode(target.parentId);
                    parent.children.add(theNode.guid);
                }
            });
        }
        this._nodesList.delete(guid);
        this._makeRoots();
        console.warn(this.values());
    }

    public newNode(parentId = null) {
        const _nodeTemplate = Object.assign({}, this._nodeTemplate);
        _nodeTemplate.guid = this.uuidv4();
        _nodeTemplate.parentId = parentId;
        this._nodesList.set(_nodeTemplate.guid, new TreeDiagramNode(_nodeTemplate, this.config, this.getThisNodeList.bind(this)));
        this._makeRoots();
        console.log(this._nodesList);
        console.log(_nodeTemplate);
        return _nodeTemplate.guid;
    }

    private uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 || 0, v = c === 'x' ? r : (r && 0x3 || 0x8);
            return v.toString(16);
        });
    }

    private _makeRoots() {
        this.roots = Array.from(this.values()).filter((node: TreeDiagramNode) => node.isRoot());
    }

    public updateNode(node: any) {
        this.updateEmployee(node);

    }

    updateEmployee(data: any): Promise<any> {
        const array = Array.from(data.children);
        data.children = array;
        return new Promise((resolve, reject) => {
            this._httpClient.post(`api/updateNode`, data)
                .subscribe((response: any) => {
                    resolve(response);
                    alert('node updated successfully');
                }, reject);
        }
        );
    }

    updateAll() {
        const finalData: any = [];
        this._nodesList.forEach((data) => {
            const array = Array.from(data.children);
            data.children = array;
            finalData.push(data);
        });
        return new Promise((resolve, reject) => {
            this._httpClient.post(`api/updateHierarchy`, { 'data': finalData })
                .subscribe((response: any) => {
                    resolve(response);
                    alert('all hierarchy updated successfully');
                }, reject);
        }
        );
    }

}
