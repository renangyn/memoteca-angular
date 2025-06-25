import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css'],
})
export class ExcluirPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  //Dentro do método ngOnInit() criaremos uma contante de nome id que receberá as propriedades 
  // snapshot — uma captura ou fotografia da rota no momento em que for acessada — e 
  // paramMap,  que retorna um mapa com informações obrigatórias e opcionais do pensamento. 
  // Adicionaremos também o método get('id').
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.pensamento = pensamento;
    });
  }

  excluirPensamento() {
    if(this.pensamento.id) {
      this.service.excluir(this.pensamento.id).subscribe(() => {
      this.router.navigate(['/listar/pensamento']);
    });
    }
  }
  cancelar(){
      this.router.navigate(['/listar/pensamento']);
}
}