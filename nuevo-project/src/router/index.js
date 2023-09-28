import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Perfil from "@/components/Perfil.vue";
import MDepartamentoBiologia from "@/components/MDepartamentoBiologia.vue";
import MDepartamentoComputacion from "@/components/MDepartamentoComputacion.vue";
import MDepartamentoFisica from "@/components/MDepartamentoFisica.vue";
import MDepartamentoMatematica from "@/components/MDepartamentoMatematica.vue";
import MDepartamentoQuimica from "@/components/MDepartamentoQuimica.vue";
import PregDepartamentoBiologia from "@/components/PregDepartamentoBiologia.vue";
import PregDepartamentoComputacion from "@/components/PregDepartamentoComputacion.vue";
import PregDepartamentoFisica from "@/components/PregDepartamentoFisica.vue";
import PregDepartamentoMatematica from "@/components/PregDepartamentoMatematica.vue";
import PregDepartamentoQuimica from "@/components/PregDepartamentoQuimica.vue";
import ManualesyGuias from "@/components/ManualesyGuias.vue";
import ManualesBasicos from "@/components/ManualesBasicos.vue";
import NormasdeLaInstitucion from "@/components/NormasdeLaInstitucion.vue";
import PreguntasRespuestasExistentes from "@/components/PreguntasRespuestasExistentes.vue";
import PreguntasRecientes from "@/components/PreguntasRecientes.vue";
import PreguntasRealizadas from "@/components/PreguntasRealizadas.vue";
import Registro from "@/components/Registro.vue";
import login from "@/components/login.vue";
import Emblemas from "@/components/Emblemas.vue";
import PreguntasDisponibles from "@/components/PreguntasDisponibles.vue";
import RankingdeAporteMensual from "@/components/RankingdeAporteMensual.vue";
import TusRespuestas from "@/components/TusRespuestas.vue";
import buscador from "@/components/buscador.vue";
import PreguntaDetalleComponent from "@/components/PreguntaDetalleComponent.vue";
import RealizarPregunta from "@/components/RealizarPregunta.vue";
import ConsultarUsuarios from "@/components/ConsultarUsuarios.vue";
import TusPreguntas from "@/components/TusPreguntas.vue";
import chatbot from "@/components/chatbot.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  

  {
    path: '/chatbot',
    name: 'chatbot',
    component: chatbot
  },
  {
    path: '/Perfil',
    name: 'Perfil',
    component: Perfil
  },
  {
    path: '/Registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/PreguntasRecientes',
    name: 'PreguntasRecientes',
    component: PreguntasRecientes
  },
  {
    path: '/PregDepartamentoBiologia',
    name: 'PregDepartamentoBiologia',
    component: PregDepartamentoBiologia
  },
  {
    path: '/PregDepartamentoComputacion',
    name: 'PregDepartamentoComputacion',
    component: PregDepartamentoComputacion
  },
  {
    path: '/PregDepartamentoFisica',
    name: 'PregDepartamentoFisica',
    component: PregDepartamentoFisica
  },
  {
    path: '/PregDepartamentoMatematica',
    name: 'PregDepartamentoMatematica',
    component: PregDepartamentoMatematica
  },
  {
    path: '/PregDepartamentoQuimica',
    name: 'PregDepartamentoQuimica',
    component: PregDepartamentoQuimica
  },
  {
    path: '/MDepartamentoBiologia',
    name: 'MDepartamentoBiologia',
    component: MDepartamentoBiologia
  },
  {
    path: '/MDepartamentoComputacion',
    name: 'MDepartamentoComputacion',
    component: MDepartamentoComputacion
  },
  {
    path: '/MDepartamentoFisica',
    name: 'MDepartamentoFisica',
    component: MDepartamentoFisica
  },
  {
    path: '/MDepartamentoMatematica',
    name: 'MDepartamentoMatematica',
    component: MDepartamentoMatematica
  },
  {
    path: '/MDepartamentoQuimica',
    name: 'MDepartamentoQuimica',
    component: MDepartamentoQuimica
  },
  {
    path: '/ManualesyGuias',
    name: 'ManualesyGuias',
    component: ManualesyGuias
  },
  {
    path: '/ManualesBasicos',
    name: 'ManualesBasicos',
    component: ManualesBasicos
  },
  {
    path: '/NormasdeLaInstitucion',
    name: 'NormasdeLaInstitucion',
    component: NormasdeLaInstitucion
  },
  {
    path: '/PreguntasRespuestasExistentes',
    name: 'PreguntasRespuestasExistentes',
    component: PreguntasRespuestasExistentes
  },
  {
    path: '/PreguntasRealizadas',
    name: 'PreguntasRealizadas',
    component: PreguntasRealizadas
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/Emblemas',
    name: 'Emblemas',
    component: Emblemas
  },
  {
    path: '/PreguntasDisponibles',
    name: 'PreguntasDisponibles',
    component: PreguntasDisponibles
  },
  {
    path: '/RankingdeAporteMensual',
    name: 'RankingdeAporteMensual',
    component: RankingdeAporteMensual
  },
  {
    path: '/TusRespuestas',
    name: 'TusRespuestas',
    component: TusRespuestas
  },
  {
    path: '/buscador:termino',
    name: 'buscador',
    component: buscador
  },
  {
    path: '/preguntas/:id',
    name: 'PreguntaDetalle',
    component: PreguntaDetalleComponent
  },
  {
    path: '/RealizarPregunta',
    name: 'RealizarPregunta',
    component: RealizarPregunta
  },
  {
    path: '/ConsultarUsuarios',
    name: 'ConsultarUsuarios',
    component: ConsultarUsuarios
  }, 
  {
    path: '/TusPreguntas',
    name: 'TusPreguntas',
    component: TusPreguntas
  },

  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
