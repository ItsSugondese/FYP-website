import { ManagementRouteConstant } from "../routing/management-routing-constant.model"
import { UserRouteConstant } from "../routing/user-routing-constant.model";

export const  NavbarConstant = [
    {
        routeLink: ManagementRouteConstant.adminDashboard,
        label: "Dashboard",
        icon: 'dashboard',
        iconLibrary: "angular"
        
    },
    {
        routeLink: ManagementRouteConstant.login,
        label: "Login",
        icon: 'login',
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
        routeLink: ManagementRouteConstant.addStaff,
        label: "Add Staff",
        icon: 'dining',
        iconLibrary: "angular"
    },



    //for user data
    {
        routeLink: UserRouteConstant.userOrder,
        label: "My Orders",
        icon: 'lunch_dining',
        iconLibrary: "angular"
    },
    {
        routeLink: UserRouteConstant.homepage,
        label: "Homepage",
        icon: 'lunch_dining',
        iconLibrary: "angular"
    },
    
];