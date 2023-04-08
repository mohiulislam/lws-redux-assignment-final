export default function getRouteComponent(uRole, roles, comp, nfComp) {
    return roles.indexOf(uRole) >= 0 ? comp : nfComp;
  }
  