import { ManagementRouteConstant } from "../routing/management-routing-constant.model";

export const  StaffNavbarConstant = [
    {
        routeLink: ManagementRouteConstant.staffDashboard,
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
        routeLink: ManagementRouteConstant.orderHistory,
        label: "Order History",
        icon: 'history',
        iconLibrary: "angular"
    },
    {
        routeLink: ManagementRouteConstant.userManagementPayment,
        label: "User Payment",
        icon: 'payments',
        iconLibrary: "angular"
    },
];