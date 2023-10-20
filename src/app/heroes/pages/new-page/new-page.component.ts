import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, catchError, filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

    public heroForm = new FormGroup({
        id:                      new FormControl<string>(''),
        superhero:               new FormControl<string>('', {nonNullable: true}),
        publisher:               new FormControl<Publisher>(Publisher.DCComics),
        alter_ego:               new FormControl(''),
        first_appearance:        new FormControl(''),
        characters:              new FormControl(''),
        alt_img:                 new FormControl(''),
    });

    public publishers = [
        {id: 'DC Comics', desc: 'DC -  Comics'},
        {id:'Marvel Comics', desc:'Marvel - Comics'}
    ]

    constructor(
        private heroService: HeroesService,
        private activatedRoute: ActivatedRoute,
        private router:Router,
        private snackbar: MatSnackBar,
        private dialog: MatDialog
        ){}

    

    ngOnInit(): void {

        if(!this.router.url.includes('edit')) return;

        this.activatedRoute.params
        .pipe(
            //switchMap it is used to extract the params from the url and use them
            switchMap(({id}) => this.heroService.getHeroById(id))
        ).subscribe( (hero) => {
            if(!hero) return this.router.navigateByUrl('/');
            this.heroForm.reset(hero); 
            return
        })
        

    }

    get currentHero(): Hero {
        const hero = this.heroForm.value as Hero;

        return hero;
    }


    onSubmit(): void{

        console.log('Form Submited',this.heroForm.valid);

        if(!this.heroForm.valid) return;
        
        if(this.currentHero.id){

        this.heroService.updateHero(this.currentHero)
        .subscribe( hero => {
            this.showSnackbar(`${hero.superhero} Updated`)
        });
        return
    }else{

        this.heroService.addHero(this.currentHero)
        .subscribe( hero => {
            this.router.navigateByUrl('/heroes/list');
            this.showSnackbar(`${hero.superhero} Created`)
        })

        return

        console.log({
            formIsValid: this.heroForm.valid,
            value: this.heroForm.value,
        })
    }
    }

    onDelete(): void {

        console.log(this.currentHero)
        if(!this.currentHero.id) throw Error('Hero id is required');

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {superhero: this.currentHero},
          });

          dialogRef.afterClosed()
          .pipe(
            filter((res:boolean) => res),
            switchMap(() => this.heroService.deleteHeroById(this.currentHero.id) ),
            filter( (wasDeleted:boolean) => wasDeleted)
          )
          .subscribe(result => {
            this.router.navigateByUrl('/heroes');
          })


      
        //   dialogRef.afterClosed().subscribe(result => {
        //     //let obs = this.heroService.deleteHeroById(this.currentHero.id)
        //     if(!result) return;

        //     this.heroService.deleteHeroById(this.currentHero.id)
        //     .subscribe( wasDeleted => {
        //         if(wasDeleted){
        //             this.router.navigateByUrl('/heroes');
        //         }
        //     } )
            
        //   });

    }

    showSnackbar(message: string):void {
        this.snackbar.open(message, 'done', {
            duration: 2000,
        })
    }

}
