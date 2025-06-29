import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginalAtual = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = []
  titulo: string = 'Meu Mural'

  constructor(private service: PensamentoService, cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.service.listar(this.paginalAtual, this.favoritos, this.filtro).subscribe((listaPensamentos) =>{
    this.listaPensamentos = listaPensamentos
    })

  }

  //https://unibb.alura.com.br/course/angular-evoluindo-aplicacao/task/149462
  recarregarComponente() {
    this.favoritos = false;
    this.paginalAtual = 1
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginalAtual, this.favoritos, this.filtro)
    .subscribe(listaPensamentos => {
      this.listaPensamentos.push(...listaPensamentos);
      if(!listaPensamentos.length) {
        this.haMaisPensamentos = false;
      }
    })
  }

  //O evento que keyup é disparado sempre que uma tecla retorna à posição original no teclado, ou seja, sempre que você solta a tecla.
  pesquisarPensamentos() {
    this.haMaisPensamentos = true;
    this.paginalAtual = 1;
    this.service.listar(this.paginalAtual,this.favoritos, this.filtro).subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos;
    } )
  }

  listarFavoritos() {
    this.favoritos = true;
    this.titulo = 'Meus Favoritos'
    this.haMaisPensamentos = true;
    this.paginalAtual = 1;
    this.service.listar(this.paginalAtual, this.favoritos, this.filtro)
    .subscribe(listaPensamentosFavoritos => {
    
      this.listaPensamentos = listaPensamentosFavoritos;
        this.listaFavoritos = listaPensamentosFavoritos;
    }) 
  } 
}
