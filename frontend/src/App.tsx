import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "../components/listItems";
import Orders from "../components/Orders";
import InputFileUpload from "../components/UploadButton";
import ParsedDataDisplay from "../components/ParsedDataDisplay";
import Button from "@mui/material/Button";
import * as yup from "yup";
import axios from "axios";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://google.com/">
        Copyright section here
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [parsedCsvData, setParsedCsvData] = React.useState([]);
  const handleFileParsed = (data) => {
    setParsedCsvData(data);
  };

  // http://127.0.0.1:8000/save_transactions/

  const handleSendToBackend = async () => {
    // Define the schema for a single transaction
    const transactionSchema = yup.object().shape({
      transactionDate: yup.date().required(),
      description: yup.string().required(),
      amount: yup.number().positive().required(),
    });

    // Prepare and validate each transaction
    try {
      const transactionsToValidate = parsedCsvData.map((transaction) => {
        // Transform the date string into a JavaScript Date object
        const dateParts = transaction.transactionDate.split("/");
        const formattedDate = new Date(
          dateParts[2],
          dateParts[1] - 1,
          dateParts[0]
        );
        return { ...transaction, transactionDate: formattedDate };
      });

      const validTransactions = await Promise.all(
        transactionsToValidate.map((transaction) =>
          transactionSchema.validate(transaction).catch((error) => {
            console.error("Validation error:", error);
            return null;
          })
        )
      );

      // Filter out invalid transactions
      const filteredTransactions = validTransactions.filter((t) => t !== null);

      // Transform the date back to "dd/mm/yyyy" format
      const transactionsForBackend = filteredTransactions.map(
        (transaction) => ({
          ...transaction,
          transactionDate:
            transaction.transactionDate.toLocaleDateString("en-GB"),
        })
      );

      // Send to backend
      axios
        .post("http://127.0.0.1:8000/save_transactions/", {
          transactions: transactionsForBackend,
        })
        .then((response) => {
          console.log("Data successfully sent to backend", response.data);
        })
        .catch((error) => {
          console.error("Error sending data to backend:", error);
        });
    } catch (error) {
      console.error("Error validating transactions:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid item xs={12}>
              {/* Single Grid Item for both Buttons */}
              <Grid item xs={12} style={{ marginBottom: "20px" }}>
                {/* Upload CSV Button */}
                <InputFileUpload onFileParsed={handleFileParsed} />

                {/* Send Validated Data to Backend Button */}
                <Button
                  variant="contained"
                  onClick={() => {
                    handleSendToBackend();
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  Save Data
                </Button>
              </Grid>

              {/* Display Parsed CSV Data */}
              <Grid item xs={12} style={{ marginBottom: "20px" }}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  {/* Component to display parsed data, passing the data as a prop */}
                  <ParsedDataDisplay data={parsedCsvData} />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
