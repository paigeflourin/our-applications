import { Component, OnInit } from '@angular/core';
import { IApplicationEntity } from '../shared/app.entities';

export interface IApplication extends OnInit {
    loading: string;
    Application: IApplicationEntity;
    readonly pageTile: string;
    readonly pageMode: string;

    ngOnInit(): void
    manageWidgets(): void
    saveChanges(): void;
}