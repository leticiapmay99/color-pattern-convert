import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-page-convert',
    templateUrl: 'page-convert.component.html',
    styleUrls: ['page-convert.component.css'],
})

export class PageConvert implements OnInit {
    
   
    constructor(private fb: FormBuilder) {}
    average = ''

    normalization: number

    cyan: number
    magenta: number 
    yellow: number
    black: number

    blue: number
    red: number
    green: number

    form1: FormGroup
    form2: FormGroup
    form3: FormGroup
    form4: FormGroup

    ngOnInit(): void {
        this.formCreation();
    }
    formCreation() {
        this.form1 = this.fb.group({
            R: [''],
            G: [''],
            B: [''],
        });
        this.form2 = this.fb.group({
            R: [''],
            G: [''],
            B: [''],
        });
        this.form3 = this.fb.group({
            R: [''],
            G: [''],
            B: [''],
        });
        this.form4 = this.fb.group({
            C: [''],
            M: [''],
            Y: [''],
            K: [''],
        });
    }
   
    sendData() {
        const FORM = this.form1.value
        const RED = parseInt(this.form1.get('R')?.value)
        const GREEN = parseInt(this.form1.get('G')?.value)
        const BLUE = parseInt(this.form1.get('B')?.value)
        this.average = ((RED + GREEN + BLUE)/3).toFixed(2)
    }

    sendData2() {
        const FORM = this.form2.value
        const RED = parseInt(this.form2.get('R')?.value)
        const GREEN = parseInt(this.form2.get('G')?.value)
        const BLUE = parseInt(this.form2.get('B')?.value)
        const sunRed = (RED/(RED + GREEN + BLUE))
        const sunGreen = (GREEN/(RED + GREEN + BLUE))
        const sunBlue= (BLUE/(RED + GREEN + BLUE))

        this.normalization = sunRed + sunGreen + sunBlue
    }

    sendData3() {
        
        const RED = parseInt(this.form3.get('R')?.value)
        const GREEN = parseInt(this.form3.get('G')?.value)
        const BLUE = parseInt(this.form3.get('B')?.value)
      

        const DIV_RED= RED/255
        const DIV_GREEN = GREEN/255
        const DIV_BLUE = BLUE/255

        this.black = 1-Math.max(DIV_RED, DIV_GREEN, DIV_BLUE)
        this.cyan = (1-DIV_RED-this.black) / (1-this.black)
        this.magenta = (1-DIV_GREEN-this.black) / (1-this.black)
        this.yellow = (1-DIV_BLUE-this.black) / (1-this.black)

    }

    sendData4() {
        
        const CYAN = parseInt(this.form4.get('C')?.value)
        const MAGENTA = parseInt(this.form4.get('M')?.value)
        const YELLOW = parseInt(this.form4.get('Y')?.value)
        const BLACK =  parseInt(this.form4.get('K')?.value)

        this.red = 255*(1-CYAN)*(1-BLACK)
        this.green = 255*(1-MAGENTA)*(1-BLACK)
        this.blue = 255*(1-YELLOW)*(1-BLACK)
    }
}