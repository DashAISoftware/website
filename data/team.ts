export interface TeamMember {
  initials: string
  name: string
  roleKey: string
  avatar?: string
  imgStyle?: { transform?: string; objectPosition?: string; scale?: string }
}

export const TEAM: TeamMember[] = [
  {
    initials: 'FB', name: 'Felipe Bravo',
    roleKey: 'abt.team.felipe-bravo-marquez.role',
    avatar: '/images/team/felipe_bravo.jpg',
  },
  {
    initials: 'CL', name: 'Claudia López',
    roleKey: 'abt.team.claudia-lopez.role',
    avatar: '/images/team/claudia_lopez.jpg',
  },
  {
    initials: 'CT', name: 'Cristián Tamblay',
    roleKey: 'abt.team.cristian-tamblay.role',
    avatar: '/images/team/cristian_tamblay.jpg',
  },
  {
    initials: 'CR', name: 'Camila Reyes',
    roleKey: 'abt.team.camila-reyes.role',
    avatar: '/images/team/camila_reyes.jpg',
  },
  {
    initials: 'ED', name: 'Emilio Díaz',
    roleKey: 'abt.team.emilio-diaz.role',
    avatar: '/images/team/emilio_diaz.jpg',
  },
  {
    initials: 'FC', name: 'Felipe Cárdenas',
    roleKey: 'abt.team.felipe-cardenas.role',
    avatar: '/images/team/felipe_cardenas.jpg',
  },
  {
    initials: 'NN', name: 'Nicolás Nast',
    roleKey: 'abt.team.nicolas-nast.role',
    avatar: '/images/team/nicolas_nast.jpg',
  },
  {
    initials: 'AC', name: 'Andrés Carvallo',
    roleKey: 'abt.team.andres-carvallo.role',
    avatar: '/images/team/andres_carvallo.jpg',
  },
  {
    initials: 'YH', name: 'Yelena Hernandez',
    roleKey: 'abt.team.yelena-hernandez.role',
    avatar: '/images/team/yelena_hernandez.jpg',
  },
]
