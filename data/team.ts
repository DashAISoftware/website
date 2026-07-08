export interface TeamMember {
  initials: string
  name: string
  roleKey: string
  avatar?: string
  imgStyle?: { transform?: string; objectPosition?: string; scale?: string }
}

export const TEAM: TeamMember[] = [
  {
    initials: 'FB', name: 'Felipe Bravo Márquez',
    roleKey: 'abt.team.felipe-bravo-marquez.role',
  },
  {
    initials: 'CL', name: 'Claudia López',
    roleKey: 'abt.team.claudia-lopez.role',
  },
  {
    initials: 'AC', name: 'Andrés Carvallo',
    roleKey: 'abt.team.andres-carvallo.role',
  },
  {
    initials: 'CT', name: 'Cristián Tamblay',
    roleKey: 'abt.team.cristian-tamblay.role',
  },
  {
    initials: 'CR', name: 'Camila Reyes',
    roleKey: 'abt.team.camila-reyes.role',
    avatar: '/images/students/camila_reyes.jpg',
  },
  {
    initials: 'ED', name: 'Emilio Díaz',
    roleKey: 'abt.team.emilio-diaz.role',
    avatar: '/images/students/emilio_diaz.png',
  },
  {
    initials: 'FC', name: 'Felipe Cárdenas',
    roleKey: 'abt.team.felipe-cardenas.role',
    avatar: '/images/students/felipe_cardenas.jpg',
  },
  {
    initials: 'NN', name: 'Nicolás Nast',
    roleKey: 'abt.team.nicolas-nast.role',
  },
  {
    initials: 'YH', name: 'Yelena Hernandez',
    roleKey: 'abt.team.yelena-hernandez.role',
  },
]
