import { ManagementRouteConstant } from "../routing/management-routing-constant.model";

export const  NavbarConstant = [
    {
        routeLink: ManagementRouteConstant.adminDashboard,
        label: "Dashboard",
        icon: 'dashboard',
        iconLibrary: "angular"
        
    },
    {
        routeLink: ManagementRouteConstant.foodManagement,
        label: "Food Management",
        icon: 'lunch_dining',
        iconLibrary: "angular"
    },
    {
        routeLink: ManagementRouteConstant.orderManagement,
        label: "Order Management",
        icon: 'dining',
        iconLibrary: "angular"
    },
    {
        routeLink: ManagementRouteConstant.staffManagement,
        label: "Staff Management",
        icon: 'person',
        iconLibrary: "angular"
    },
    {
        routeLink: ManagementRouteConstant.userManagement,
        label: "User Management",
        icon: 'people',
        iconLibrary: "angular"
    },
    {
        routeLink: ManagementRouteConstant.addStaff,
        label: "Staff Management",
        icon: 'dining',
        iconLibrary: "angular"
    },
    
];