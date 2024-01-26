import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LayersIcon from "@mui/icons-material/Layers";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import ConstructionIcon from "@mui/icons-material/Construction";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import ComputerIcon from "@mui/icons-material/Computer";
import FlightIcon from "@mui/icons-material/Flight";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Upload Transaction" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="View Transactions" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved transactions
    </ListSubheader>

    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Groceries" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <ConstructionIcon />
      </ListItemIcon>
      <ListItemText primary="Utilities" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <DeliveryDiningIcon />
      </ListItemIcon>
      <ListItemText primary="Dining Out" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <SportsEsportsIcon />
      </ListItemIcon>
      <ListItemText primary="Entertainment" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <CheckroomIcon />
      </ListItemIcon>
      <ListItemText primary="Shopping" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <DirectionsCarIcon />
      </ListItemIcon>
      <ListItemText primary="Transportation" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <MedicationLiquidIcon />
      </ListItemIcon>
      <ListItemText primary="Healthcare" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <ComputerIcon />
      </ListItemIcon>
      <ListItemText primary="Technology" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <FlightIcon />
      </ListItemIcon>
      <ListItemText primary="Travel" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Miscellaneous" />
    </ListItemButton>
  </React.Fragment>
);
