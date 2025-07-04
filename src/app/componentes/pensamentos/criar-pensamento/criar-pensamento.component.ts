import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {
  // ngOnInit(): void {
  //     this.formulario = new FormGroup({
  //       conteudo: new FormControl(''),
  //       autoria: new FormControl(''),
  //       modelo: new FormControl('')
  //     })
  //   }

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      autoria: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      modelo: ['modelo1'],
      favorito: [false]
    });
  }

  criarPensamento() {
    console.log(this.formulario.get('autoria')?.errors);
    if (this.formulario.valid) {
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listar/pensamento']);
      });
    } else {
    }
  }

  cancelar() {
    this.router.navigate(['/listar/pensamento']);
  }

  habilitarBotao(): string {
    if(this.formulario.valid)
     {
       return 'botao'
     } else
     return 'botao__desabilitado'
  }
}