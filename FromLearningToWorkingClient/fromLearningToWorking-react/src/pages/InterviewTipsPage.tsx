// `import {
//   Box,
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Chip,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Fade,
//   Slide,
// } from "@mui/material"
// import {
//   ExpandMore,
//   CheckCircle,
//   Psychology,
//   Groups,
//   Schedule,
//   Star,
//   TipsAndUpdates,
//   QuestionAnswer,
// } from "@mui/icons-material"
// import React from "react"

// const InterviewTipsPage = () => {
//   const tipCategories = [
//     {
//       title: "הכנה לפני הראיון",
//       icon: <Schedule sx={{ fontSize: 30 }} />,
//       color: "#4caf50",
//       tips: [
//         "חקור את החברה והתפקיד מראש",
//         "הכן דוגמאות קונקרטיות מהניסיון שלך",
//         "תרגל תשובות לשאלות נפוצות",
//         "הכן שאלות לשאול למראיין",
//         "בדוק את המיקום והגע מוקדם",
//       ],
//     },
//     {
//       title: "במהלך הראיון",
//       icon: <QuestionAnswer sx={{ fontSize: 30 }} />,
//       color: "#2196f3",
//       tips: [
//         "שמור על קשר עין",
//         "הקשב בעיון לשאלות",
//         "תן דוגמאות ספציפיות",
//         "שאל שאלות הבהרה אם צריך",
//         "הראה התלהבות ועניין",
//       ],
//     },
//     {
//       title: "שפת גוף ותקשורת",
//       icon: <Groups sx={{ fontSize: 30 }} />,
//       color: "#ff9800",
//       tips: [
//         "שב זקוף ובטוח",
//         "חייך באופן טבעי",
//         "השתמש בתנועות ידיים מתונות",
//         "דבר בקצב מתון וברור",
//         "הימנע מתנועות עצבניות",
//       ],
//     },
//     {
//       title: "שאלות נפוצות",
//       icon: <Psychology sx={{ fontSize: 30 }} />,
//       color: "#9c27b0",
//       tips: [
//         "ספר לי על עצמך",
//         "מה החולשות והחוזקות שלך?",
//         "למה אתה רוצה לעבוד אצלנו?",
//         "איפה אתה רואה את עצמך בעוד 5 שנים?",
//         "ספר על אתגר שהתמודדת איתו",
//       ],
//     },
//   ]

//   const commonMistakes = [
//     "הגעה מאוחרת לראיון",
//     "חוסר הכנה על החברה",
//     "תשובות כלליות מדי",
//     "ביקורת על מעסיק קודם",
//     "שאלות על שכר בשלב מוקדם",
//     "חוסר שאלות למראיין",
//   ]

//   const successTips = [
//     "הכן סיפורים מהניסיון שלך",
//     "תרגל עם חברים או משפחה",
//     "הכן רשימת הישגים",
//     "למד על תרבות החברה",
//     'הכן תשובה ל"ספר על עצמך"',
//   ]

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         py: 4,
//       }}
//     >
//       <Container maxWidth="lg">
//         <Fade in={true} timeout={1000}>
//           <Box sx={{ textAlign: "center", mb: 6 }}>
//             <Typography
//               variant="h3"
//               component="h1"
//               sx={{
//                 fontWeight: "bold",
//                 color: "white",
//                 mb: 2,
//                 textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
//               }}
//             >
//               <TipsAndUpdates sx={{ fontSize: 40, mr: 2, verticalAlign: "middle" }} />
//               טיפים לראיון עבודה מוצלח
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 color: "rgba(255,255,255,0.9)",
//                 maxWidth: 600,
//                 mx: "auto",
//               }}
//             >
//               כל מה שאתה צריך לדעת כדי להצליח בראיון העבודה הבא שלך
//             </Typography>
//           </Box>
//         </Fade>

//         {/* Tips Categories */}
//         <Grid container spacing={4} sx={{ mb: 6 }}>
//           {tipCategories.map((category, index) => (
//         //     <Grid item xs={12} md={6} key={index}>
//         //       <Slide direction="up" in={true} style={{ transitionDelay: `${index * 200}ms` }}>
//         //         <Card
//         //           sx={{
//         //             height: "100%",
//         //             background: "rgba(255,255,255,0.95)",
//         //             backdropFilter: "blur(10px)",
//         //             borderRadius: 3,
//         //             boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
//         //             transition: "all 0.3s ease",
//         //             "&:hover": {
//         //               transform: "translateY(-5px)",
//         //               boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
//         //             },
//         //           }}
//         //         >
//         //           <CardContent sx={{ p: 3 }}>
//         //             <Box
//         //               sx={{
//         //                 display: "flex",
//         //                 alignItems: "center",
//         //                 mb: 3,
//         //                 color: category.color,
//         //               }}
//         //             >
//         //               {category.icon}
//         //               <Typography variant="h6" sx={{ fontWeight: "bold", mr: 2 }}>
//         //                 {category.title}
//         //               </Typography>
//         //             </Box>
//         //             <List dense>
//         //               {category.tips.map((tip, tipIndex) => (
//         //                 <ListItem key={tipIndex} sx={{ px: 0 }}>
//         //                   <ListItemIcon sx={{ minWidth: 30 }}>
//         //                     <CheckCircle sx={{ color: category.color, fontSize: 20 }} />
//         //                   </ListItemIcon>
//         //                   <ListItemText
//         //                     primary={tip}
//         //                     sx={{
//         //                       "& .MuiTypography-root": {
//         //                         fontSize: "0.9rem",
//         //                         lineHeight: 1.4,
//         //                       },
//         //                     }}
//         //                   />
//         //                 </ListItem>
//         //               ))}
//         //             </List>
//         //           </CardContent>
//         //         </Card>
//         //       </Slide>
//         //     </Grid>
//         //   ))}
//         // </Grid>

//         {/* Common Mistakes and Success Tips */}
//         // <Grid container spacing={4}>
//         //   <Grid item xs={12} md={6}>
//         //     <Slide direction="right" in={true} style={{ transitionDelay: "800ms" }}>
//         //       <Card
//         //         sx={{
//         //           background: "rgba(255,255,255,0.95)",
//         //           backdropFilter: "blur(10px)",
//         //           borderRadius: 3,
//         //           boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
//         //         }}
//         //       >
//         //         <CardContent sx={{ p: 3 }}>
//         //           <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3, color: "#f44336" }}>
//         //             טעויות נפוצות להימנע מהן
//         //           </Typography>
//         //           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//         //             {commonMistakes.map((mistake, index) => (
//         //               <Chip
//         //                 key={index}
//         //                 label={mistake}
//         //                 variant="outlined"
//         //                 sx={{
//         //                   borderColor: "#f44336",
//         //                   color: "#f44336",
//         //                   "&:hover": {
//         //                     backgroundColor: "rgba(244, 67, 54, 0.1)",
//         //                   },
//         //                 }}
//         //               />
//         //             ))}
//         //           </Box>
//         //         </CardContent>
//         //       </Card>
//         //     </Slide>
//         //   </Grid>

//         //   {/* <Grid item xs={12} md={6}>
//         //     <Slide direction="left" in={true} style={{ transitionDelay: "1000ms" }}>
//         //       <Card
//         //         sx={{
//         //           background: "rgba(255,255,255,0.95)",
//         //           backdropFilter: "blur(10px)",
//         //           borderRadius: 3,
//         //           boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
//         //         }}
//         //       >
//         //         <CardContent sx={{ p: 3 }}>
//         //           <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3, color: "#4caf50" }}>
//         //             <Star sx={{ mr: 1, verticalAlign: "middle" }} />
//         //             טיפים להצלחה
//         //           </Typography>
//         //           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//         //             {successTips.map((tip, index) => (
//         //               <Chip
//         //                 key={index}
//         //                 label={tip}
//         //                 variant="outlined"
//         //                 sx={{
//         //                   borderColor: "#4caf50",
//         //                   color: "#4caf50",
//         //                   "&:hover": {
//         //                     backgroundColor: "rgba(76, 175, 80, 0.1)",
//         //                   },
//         //                 }}
//         //               />
//         //             ))}
//         //           </Box>
//         //         </CardContent>
//         //       </Card>
//         //     </Slide>
//         //   </Grid>
//         // </Grid> */}

//         // {/* FAQ Section */}
//         // <Box sx={{ mt: 6 }}>
//         //   <Fade in={true} style={{ transitionDelay: "1200ms" }}>
//         //     <Typography
//         //       variant="h5"
//         //       sx={{
//         //         fontWeight: "bold",
//         //         color: "white",
//         //         mb: 3,
//         //         textAlign: "center",
//         //       }}
//         //     >
//         //       שאלות נפוצות
//         //     </Typography>
//         //   </Fade>

//           {[
//             {
//               question: "כמה זמן לפני הראיון כדאי להתחיל להתכונן?",
//               answer:
//                 "מומלץ להתחיל להתכונן לפחות שבוע לפני הראיון. זה נותן לך זמן לחקור את החברה, להכין תשובות ולתרגל.",
//             },
//             {
//               question: "איך להתמודד עם עצבנות לפני הראיון?",
//               answer: "נשימות עמוקות, הכנה יסודית, הגעה מוקדמת למקום, ותזכורת שזה שיחה דו-כיוונית - גם אתה בוחן אותם.",
//             },
//             {
//               question: "מה לעשות אם לא יודע תשובה לשאלה?",
//               answer: "היה כנה ואמור שאתה לא יודע, אבל הראה נכונות ללמוד. אפשר גם לשאול הבהרות או לתת תשובה חלקית.",
//             },
//           ].map((faq, index) => (
//             <Accordion
//               key={index}
//               sx={{
//                 mb: 2,
//                 background: "rgba(255,255,255,0.95)",
//                 backdropFilter: "blur(10px)",
//                 borderRadius: 2,
//                 "&:before": { display: "none" },
//               }}
//             >
//               <AccordionSummary expandIcon={<ExpandMore />}>
//                 <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                   {faq.question}
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
//                   {faq.answer}
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//           ))}
//         </Box>
//       </Container>
//     </Box>
//   )
// }
import React from "react"
const InterviewTipsPage = () => {
    return (<>tips page</>)
}
export default InterviewTipsPage
