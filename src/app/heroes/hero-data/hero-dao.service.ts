import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Hero } from '../hero';

@Injectable()
export class HeroDaoService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private heroesUrl = 'api/heroes';

    constructor( private http: Http ) { }
    
    public create(name: String): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({name}), {headers: this.headers})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    public delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    
    public getHero( id: number ): Promise<Hero> {
        return this.getHeroes()
            .then( heroes => heroes.find( hero => hero.id === id ) );
    }

    public getHeroes(): Promise<Hero[]> {
        return this.http.get( this.heroesUrl )
            .toPromise()
            .then( response =>  response.json().data as Hero[] )
            .catch( this.handleError );
    }

    private handleError( error: any ): Promise<any> {
        console.error( 'HeroDaoService: An error occurred', error );
        return Promise.reject( error.message || error );
    }
    
    public update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }
    
}
