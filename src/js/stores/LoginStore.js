import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';

class LoginStore extends Flux.Store{
    
    constructor(){
        super();
        this.state = {
            //initialize store state
            user: [ {name:"Fiat", email:"f@gh.com", imgUrl:"https://randomuser.me/api/portraits/men/46.jpg", ID:"1"},
                    {name:"tom", email:"t@gh.com", imgUrl:"https://randomuser.me/api/portraits/lego/2.jpg", ID:"2"},
                    {name:"Hank", email:"h@gh.com", imgUrl:"https://randomuser.me/api/portraits/men/74.jpg", ID:"3"},
                    {name:"Bob", email:"b@gh.com", imgUrl:"https://randomuser.me/api/portraits/men/2.jpg", ID:"4"},
                    {name:"Dora", email:"d@gh.com", imgUrl:"https://randomuser.me/api/portraits/women/66.jpg", ID:"5"},
                    {name:"Emma", email:"e@gh.com", imgUrl:"https://randomuser.me/api/portraits/women/74.jpg", ID:"6"}
            ]
        };
                        //  key={i}     
                        // name ={contact.name} 
                        // email={contact.email} 
                        // imgUrl={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP0AAADHCAMAAADlCqUFAAAAFVBMVEXMzMzb29vOzs7Z2dnW1tbR0dHU1NT2HhYqAAAD60lEQVR4nO2dybLrIAxEPf//J9+AU5XEL5Vng9pwQGeTbdqSWgI8DIPjOI7jOI7jOI7jOE4iU2Rd1/hb+t/cx0Pysszz+M68bGv7l2Dalk/ZH5dga/kCTD+UP1nW0n9SwwnpewI0qH9dTknf41/6zxozXdAewt9S+V/U3pb89ar2saHkvxz4SBu9bzpn9F/jj78CU7L2CHv8yRQfMwCr30D8g620jDRsxFP7X5rbfwM4/G5m4oHyrfKeKT+90TcgP2W+/QXK+mzzPkAa/S0t7wkn9+1D/8j90qJOY131EUzwjQ1/hxJ8ReKPmOALPC8AsX1J4j8oresUosSHpL7E8QOI1Ldb2h5AuL6q7McRMOzLyh5R+LKyR+zxibp9AGB7MtPrXT1gj6Nv9bqGB2h5wobn6ivH1bt6V+/qXb2rd/Xtqx+E4uvf2sq4Re+/AFa4fav33Q0Rfe/r9b2nW3/D61y9btypv90r1QMsX9jwAZYvbHkAyxe2PIDp6UyfYHo620OYnmyNizA9me0hyl5le4AjzIjG9iBlL7I9SNmLpj1I4mtsj9HtA4rCp5S9pvAxiS+JPWKJE9B0PIh81ZzPyH3V+h7he7qdLULwdfv5hGlPd5ZDSH3dKSZglae8e8HV143y7oX61Qtdj7DM69vz++73uhNswjqn70lXVvgE09MVPqHse1/fi1Kf0O8CmuATHD+iCD4l9INilcsw/B3zpQ5gaf/G9Rco/wT3ctHJbuJFfljAKvtJJf/CKvlBbv+G1cTLmHCPWA09mDHnAyv1RM8brAqfaXpWhc8se6vUhya+TcenJr7NBic18W1SH5v4Fq7PTXyL1GeOOk9yfY+1rj+SG3yu50Uyg1/672eSF3x46DNtH131gZyejzb8nfS1DnNT50Cy8eHzPpCa+w3kfSDN95vI+0DX30dMkY/v9G9cL/1Gij7i6l29q3f1fam//joGV98Mrt7Vd6m+b8939a7e1Z+j7/V9S+qv7+00tLHl6jtWf/08pyX1CUeZTRzkRFJOc9pp+Emn2K0EP+0kq5WOn3iI20bwk+/eaEF++q0r7NvVIjn37dDl5z6Xh5bf9Z2qFg9n4B7DfLIaPY5IDL/hk7gzTb/1U8gk/cbaA5j4r5r3bsyAR7EnK6/7pn+rW78g5T+p1wCUYX9RZwFMwm+jHagtAe4J+4uaHEBe7d+oYwK+O+wvyjvAtJXSHimaAEVS/qC/lAOKZrqrFJmBi5X7v9yuvyLtgVv1V1DvR27TX6H2wD3+L/ziayb6s69KA78j3v83fG2cBmX4a9c+KjeAAeJ17yu4bwGfgyb3q7a7dxTOh8j6nfOi/gDp6D+D53TPPQAAAABJRU5ErkJggg=="}
                        // ID={contact.id}
                        // onDelete={this.props.onDelete}
                        // writeMsg={this.props.writeMsg}
                        // https://randomuser.me/api/portraits/ contact.gender +"/" + contact.ssn +".jpg"
    }
    
    _SetUser(update){
        console.log('set user');
        this.setStoreState({
            //store properties
            user: update
        }).emit();
        
    }
    getUser(){
        console.log('gave user');
        return this.state.user;
    }
}
export default new LoginStore();