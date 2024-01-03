import { config } from "dotenv"
import { OpenAI } from "langchain/llms/openai";
config()


export const run = async () => {
  // Initialize the LLM to use to answer the question.
    const model = new OpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        temperature: 0.4,
        modelName: "gpt-4-1106-preview",
    }); 

    const res = await model.call({
        query : `1.	Introduction and Brief
        1.1 Data Description
        In the following sections, we present a comprehensive analysis of predictions for students based on data collected from “student_prediction.csv”. This data aims to shed light on identify hidden merits and issues among the students in their academic and provide meaningful insight for decision making. Throughout the description, we will highlight key findings, discuss the methodology used in variables and measures, data processing, data analysis techniques, data presentation and others. The provided dataset consists of 1534 rows of data which represent the number of students and 33 columns which show the habits and act of the following student include variables such as scholarship, parents' education level, and more. Besides that, we will explore, transform, clean, and validate dataset provided by the Faculty of Education department as the data is too huge in size and may have empty or out-of-range data. Within the document, we will present our data analysis with visual representations such as, bar chart, pie chart, count plot, and ROC curve to aid in understanding the trends and patterns of the data.
        1.2Assumptions
        
        1.3Scopes and Objectives
        Research question: 
        What factor will impact the student cumulative grade point average based on the dataset. 
        
        Hypothesis 
         
        Objective 1 : Measuring the impact of student discussion in a student cumulative grade point average. 
         
        Objective 2 : Measuring the correlation between exam preparation and cumulative grade point average of student. 
         
        Objective 3 : To explore and visualise whether student attendance in class significantly effect a student cumulative grade point average. 
         
        Objective 4 : examine student taking notes in class will significantly impact on a student cumulative grade point average. 
        
         
        2.	 Data Preparation
        2.1.	Data Import
        
        The given dataset needs to be imported into R studio before starting to do the analysis.  
        
         
        Figure 2.1.2 Data Import
        
        The data set is imported with the name "student prediction". The read.excel() function is used to get the location of dataset and the view() function will show the tabular format of imported data for viewing. 
         
        Figure 2.1.3 Tabular Form of Dataset
        In the tabular form, there are 1534 rows of observations and 33 columns of variables. 
        
        
         
        Figure 2.1.4 Data Exploration
        Will be using ncol(), nrow() and colnames() function to get the number of column, number of rows, and the name of each column of the dataset. 
        
        2.2.	Cleaning/Pre-processing
         
        Figure 2.2.1 Data Cleaning & Pre-processing coding
        Figure 2.2.1 shows the coding for data cleaning and pre-processing. The given dataset will be processed for data cleaning first. After data cleaning, all the column names in the dataset will be converted to attribute values for further processing.
        
          
        Figure 2.2.2 Output
        However, the value of this dataset does not contain any null value as the output is provided as “FALSE” in Figure 2.2.2. Therefore, data cleaning is not necessary in this case.
        
        2.3.	Validation
         
        Figure 2.3.1 : Data validation
        
        The figure above represents the process of data validation to check whether the data is in range. Data validation is a crucial step in the data analysis process, ensuring that the data you are working with is accurate, complete, and reliable. It involves checking and verifying data to identify errors, inconsistencies, or missing information. Data validation enhances the quality of your data and increases the reliability of your analyses and interpretations. 
        
         
        Figure 2.3.2 : Check for empty
        When we process the algorithm to check whether there is blank data, it returns FALSE which indicates that in our dataset “student_prediction” there is no empty data. Based on this we come with a summary of the dataset containing no empty data.
        
        
         
        3.0Data Analysis
        1.2	 3.1 Analysis on the Relationship between LIKES_DISCUSS and IVS and DVS.
          In this Analysis we’ll be looking into the correlation between the independent variable “LIKES_DISCUSS”, which ask the question whether discussion improves one’s interest and success in the course and the dependent variable “CUML_GPA” which is the student’s previous semester’s GPA.
        3.1.1 Uni-variable Analysis
          
        Figure 1 : Pie Chart                                                                             Figure 2: Bar Graph
          Looking at the figure 1, we can see that most students choose “Sometimes” as their opinion whether discussions impacted their performance in class, with “Never” being the lowest with a frequency of 93 or 6.1% and “Always” close behind with a frequency of 690 or 45% picked.
          The Mean response calculated by the average of the values 1,2,3 gave the Value 2.39 which shows a Strong tendency towards “Sometimes” while leaning towards the “Always” Option. Additionally, using the sd() function in R returned a value of 0.599 which means moderate variability in the Student’s Responses. 
         
        3.1.2 Bi-Variable Analysis
          In this Bivariate we’ll go through several Graphs and Charts to analyze the relationship between the “LIKES_DISCUSS” Independent variable and the “CUML_GPA” Dependent Variable, as well as measuring and concluding on its impact and strength of the relationship.
        3.1.2.1 Count Plot Analysis
         
        Figure 3 : Count Diagram
        In this Diagram, the “LIKES_DISCUSS” variable is on the X axis categorized by “Never”, “Sometimes” and “Always”. The Y-Axis shows the Cumulative GPA ranging from lowest to the Highest. Each Point Size and color is proportional to the number of students in that specific GPA and corresponding discussion preference.
        Looking at the diagram we can somewhat conclude that there is a moderate relationship between how well a student scores in their GPA and whether their preference was that discussion has made a positive impact on their interest and success. Students who picked “Always” had a darker color and higher frequency in the Higher “CUML_GPA” Values as seen in the diagram, where the value “5” or “GPA>3.49” being the most frequent in these students. While students who picked Sometimes had the highest frequency in “4” or “GPA between 3.00 and 3.49”.
         
        3.1.2.2 Stacked-Bar Graph Analysis
         
        Figure 4Stacked Bar Graph
          When Plotted in a 100% Stacked Bar Graph, we can easily extrapolate the Percentage breakdown of GPA interval in each of the options in “LIKES_DISCUSS”. In a Normal Frequency Based Stacked Bar Chart would display different heights and would be difficult to interpret. 
          Looking at the Graph we can see an obvious impact and trend where students who picked always performed better than those who picked sometimes vice versa for those who picked sometimes than those who picked Never. Looking at the lower, median, and upper bound values we can see that students who picked sometimes and always had a higher median GPA of 3 and only 2 for Never, The Upper bound for Never is between 3 and 4 GPA Interval, sometimes at 4 and always at 5. Hence, students who choose that class discussions always improved their performance saw a significant difference in actual GPA and academic performance.
        Additionally, simply looking at the % makeup of GPA we can see that people who scored 1 decreased when going from Never to Sometimes and Sometimes to Always, same could be said for those who scored 5 increasing from None in Never to slightly in sometimes and most frequently outcome in Always.
          These indicators collectively show the increase of a student’s GPA Interval score depending on their opinion on if discussions improve their performance or not. 
        3.1.3 Multi-Variable Analysis.
         
        Figure 5 Stacked Multi-Variable Bar Chart
          When comparing LIKES_DICUSS to another variable with a high correlation value like Number of Siblings which is measured from 1,2,3,4 and 5+ siblings with the dependent variable CUML_GPA Interval we can see afew statistical anomalies and slight correlations. The first correlation between the 2 independent variables that can be extrapolated from the figure is that as number of siblings increase the more likely the student picks “Always” in LIKES_DISCUSS. 
          There isn’t any meaningful or strong correlation between a student’s grades and the number of siblings a student has, with the only possible extrapolation being the slight decrease in students who fail. Moreover, the top scoring students when looking at Number of siblings were those who picked “Always” with 1 or 5+ siblings which refutes the hypothesis of having more or less siblings affecting one’s cumulating grade or performance.
          Additionally, we can observe statistical anomalies suggesting this data might be fabricated as the “Never” Option in students with 2 siblings having a massive 23 students scoring 4 GPA Interval (3.00-3.49) While simply having no 2s and 3s. 
        3.1.4 Chi-Square Analysis
         
        Figure 6 Chi Square Test
          Using the simple built-in chi-square test function “chisq.test()” returns us a square statistic of 175.85 with 8 degrees of freedom and a probability value of less than 2.2e-16. 
        3.1.4.1 X-Squared Value
          With a value of 175.85 for its x-squared statistic suggest a very strong association between the Independent Variable “LIKES_DISCUSS” and the Dependent Variable “CUML_GPA” as the observed frequencies between both values deviate substantially from the expected/random frequencies under the null hypothesis of independence.
          
        3.1.4.2 DF (Degrees of Freedom)
         
          The Degrees of freedom is calculated by the formula (Number of categories -1) Multiplied by (Number of categories -1) In our case Variable 1 has 3 categories (Never, Sometimes, Always) and Variable 2 has 5 categories (1,2,3,4,5) resulting in 8 degrees of freedom.
        3.1.4.3 P-Value (probability)
          Our calculated p-value is less than 2.2e-16, which is considered extremely small. In statistical Modeling/Test, a Chi Square P-value Less than > 0.05 leads us to reject the null hypothesis of independence with a very high level of confidence as the p-value is several magnitudes smaller than the required 5%. This shows that there is a statistically significant association/correlation between the 2 variables “CUML_GPA” and “LIKES_DISCUSS”.
        
        3.1.4.4 Conclusion 	
          Looking at all the Values and results we can safely say that there is an association between a student’s opinion whether discussions impact their interest or success in that course and their Cumulative GPA in that course. However, The Chi-Square Test does not tell us about the nature of the relationship whether it is a positive or negative one nor imply that it is a causation but simply it has a strong association and correlation. 
        
        3.1.5 Correlation Between Categorical Values Summaries
         
        Figure 7Craner’s V 
          Calculating the Cramer’s V score between the LIKES_DISCUSS and CUML_GPA returns a value of 0.2394076 which is considered as “Moderate” (IBM, 2023), the moderate association value further confirms a correlation between a student’s choice on whether discussions are beneficial and their actual performance in exams and a higher cumulative GPA interval. The IV can be selected and used in our prediction model to increase its accuracy in predicting a student’s GPA using the independent variables.
         
        3.1.6 Additional Features (K-NN Prediction and Accuracy Model)
         
        Figure 8 k-NN model
          k-NN algorithm or k-nearest neighbors is an instance-based/lazy learning type algorithm and also one of the simplest types of machine learning algorithm. The main parameter for a k-NN model is the “k” which is a value that controls how sensitive the algorithm is to the noise points, too large and it starts to generalize and fails to accurately predict data and too small and it becomes too sensitive to noise or influenced heavily by outliers or anomalies resulting in a worse prediction and accuracy.
          In my model the IVs are first selected, and then the DV as placed last as on the list which will then be used as the target that is used to predict. The model uses a nearly 80/20 split which is the standard for train-test split for most models, the code uses a randomness seed that ensures we get the same output every time it is ran. The randomness is used during the selection process for training to ensure that data is randomly chose instead of the first X rows, a k value of 5 to that is not to general or specific to get a good average.
          Once it is processed, the accuracy is calculated to find how often it was correct which for the seed(8) it obtained a accuracy of 0.45508 which is significantly higher than a random model which would have a 20% accuracy given that CUML_GPA has 5values and picking 1 at random.
         
          NIR(No Information Rate) is a simply algorithm that calculates the accuracy simply by picking the most frequent/majority GPA for a set of Independent variables. Which our model is significantly more accurate showing the model’s performance over randomness.
         
        Figure 9 Actual Vs predicted table values.
        In this table we can see an in-depth actual vs predicted table in which we can see what exactly was predicted given the independent variable values it was given. In most cases even when the prediction was wrong, we can see that the predicted value was often not to far off to the actual CUML_GPA value.
         
        Figure 10 Prediction accuracy by combination of Variables
          In this table the Combinations of variables were grouped up by the combinations of the tested rows, the table being sorted by descending Total amount. The variation of accuracy ranges from as low as 14.3% and to as high as 100% suggesting that the model performs better for certain combinations of values of the independent variables than others, this is likely due to the small testing/training data it has to the specific combinations which effects the accuracy heavily.
        For combinations with a higher total we can see the accuracy percentage moving closer to the overall model accuracy tested in the k-NN model figure, accuracy percentage also becomes more reliable as total goes up as Confidence Interval becomes smaller the larger the sampling size gets.
         
        1.3	3.2 Measuring the correlation between Preparation of Exam and the CGPA 
        1.4	3.2.1 Univariate Analysis
        
        
        The univariate analysis focuses on the variable "Preparation for the Midterm Exam" from the "Student Prediction" dataset. Figure 3.2.1 (bar chart) and Figure 3.2.2 (pie chart) illustrate the distribution of preparation categories. Most students (84.9%) prepare closest to the exam, while a small percentage (1.3%) never prepares. Regular preparation throughout the semester accounts for 13.8% (212 students). In summary, most students prefer last-minute preparation, but a notable portion never prepares for midterms. 
        3.2.2 Bivariate Analysis
        
        Bivariate analysis explores the correlation between midterm exam preparation (independent variable) and cumulative grade point average (CGPA, dependent variable). In this case, we will look at the research question, "What is the correlation between exam preparation and cumulative grade point average?" and the hypothesis that "We hypothesize that students who have prepared for the midterm exam regularly during the exam will obtain a higher cumulative grade point average (CGPA)." 
         
        Figures 3.2.3 and 3.2.4, depicting side-to-side and stacked bar charts, reveal unexpected trends. While last-minute preparation correlates with higher CGPA (3.00–3.49), students who never prepare also achieve scores above 3.49. Regular midterm preparation yields a higher percentage in the 2.50–2.99 and 3.00–3.49 ranges but surprisingly lower scores above 3.49 (23.6%). The hypothesis that regular preparation leads to a higher CGPA is challenged, suggesting other factors influence this relationship.
        
         
        1.5	3.2.3 Multivariate Analysis
        
        
        Multivariate analysis examines the relationship between student midterm preparation (independent variable), the impact of projects/activities (another independent variable), and cumulative grade point average (dependent variable). Figures 3.2.7 and 3.2.8, using side-to-side and stacked bar charts, indicate a positive impact on CGPA (2.00–2.49) with last-minute midterm preparation. Surprisingly, even without midterm preparation, a positive impact yields a score above 3.49. Neutral impact and last-minute preparation result in a CGPA of 3.00–3.49. Notably, no student with a neutral impact never prepared for the exam. In conclusion, the impact of projects/activities seems to have limited influence on student grades, challenging assumptions about its significance. 
        
         
        1.6	3.2.4 Chi-square Test 
        
         
        Figure 3.2.9 Chi-square Test
         
        Figure 3.2.10 Frequency Table
        
        Figure 3.2.9 displays the chi-square test results on the frequency table shown in Figure 3.2.10. The test reveals a significant association between variables, with a test statistic (X-squared) of 138.22 and 8 degrees of freedom. The p-value is extremely low, less than 〖2.2〗^(-16)), indicating a substantial difference between observed and expected frequencies. A p-value below 0.05 suggests the rejection of the null hypothesis, signifying a significant relationship between the independent and dependent variables. This outcome, well below the 0.05 significance level, supports the conclusion that the association is unlikely due to chance.
        
        As a conclusion, the chi-square test supports the existence of a significant relationship between the variables, providing valuable insights into the interplay between student preparation habits and performance outcomes.
         
        1.7	3.2.5 Correlation Analysis – Cramer’s V
        
         
        Figure 3.2.11 Cramer's V
        Figure 3.2.11 shows the code for Cramer’s V method. In this instance, we are looking into the relationship between CGPA and exam preparation using Cramer's V Correlation. Considering that Cramer's V is 0.2123, It is within the range of moderate association (0.2–0.3). This suggests that there is a weak but discernible correlation between the two categorical variables. The practical implications of this discovery should be evaluated in relation to academic achievement, accounting for variables like study habits, time management, and individual variations. Even though the study offers insightful information, it's critical to acknowledge the potential impact of these extra elements on preparation and CGPA. To sum up, the Cramer's V value indicates a moderate correlation, which emphasizes the importance of study habits for academic achievement. This insight contributes to our understanding of the factors influencing CGPA and may guide interventions to support student success.
        
         
        1.8	3.2.6 Additional Feature – Naïve Bayes 
        
         
        Figure 3.2.12 Naive Bayes Data Frame
        In this analysis, we aimed to predict the cumulative grade point average (CGPA) of students based on features such as 'prep_exam', 'like discuss', 'attendance in class', and 'taking notes'. We employed a Naive Bayes model using the 'naiveBayes' function from the e1071' packages. The dataset was divided into training (80%) and test (20%) sets using the caret package in R. The trained Naïve Bayes model was applied to a test set ('nb_pred') to make predictions on CGPA, and a confusion matrix was generated using the 'confusionMatrix' function.
         
        
          
        Figure 3.2.13 Naive Bayes Classifier for Discrete Predictors
        A-priori probabilities outline grade distribution, while conditional probabilities reveal study habit likelihoods based on academic performance. Lower grades correlate with last-minute preparation, irregular attendance, and occasional notetaking. Improved grades show a shift to regular preparation, consistent attendance, and frequent notetaking. Likewise, a preference for discussions aligns with higher grades. These insights inform strategies for academic support and intervention.
         
        Figure 3.2.14 Predicted Grade VS Actual Grade
        The table compares predicted grades (nb_pred) from the Naïve Bayes model with actual grades (test$cgpa). Diagonal cells show correct predictions, while off-diagonal cells indicate misclassifications. Strengths include accurate predictions for '2.00-2.49' and 'above 3.49' categories (12 and 26 correct predictions). Challenges arise in distinguishing '2.00-2.49' from '3.00-3.49', with 17 misclassifications. While the model shows proficiency in certain predictions, it needs refinement, especially in discriminating between closely positioned grade categories. This nuanced understanding is vital for fine-tuning the model and improving accuracy in future predictions.
         
        Figure 3.2.15 Confusion Matrix and Statistics
        
        The confusion matrix and accompanying statistics provide a detailed evaluation of the Naïve Bayes model's performance. The accuracy of a classification model is the proportion of correctly predicted instances among the total instances. The confusion matrix is a valuable tool for assessing the performance of a classification model, providing a detailed breakdown of its predictions, and offering insights into its strengths and weaknesses across different classes.
         
        From the output of the code, the overall accuracy of the Naïve Bayes model is given as 0.3311, or 33.11%. This means that, based on the predictions made by the model, it correctly classified approximately 33.11% of the instances in the dataset. While accuracy is a common metric for evaluating classification, it is also important to consider it in conjunction with other metrics.
         
        The 95% confidence interval (CI) for accuracy is (0.2786, 0.3871), indicating the expected range for true accuracy. A wider interval suggests less precision and more variability in accuracy across different samples. This means that if you repeatedly sample from the population and build a Naïve Bayes model on each sample, you would expect the true accuracy of the model to be within the range of 0.2786 to 0.3871 in 95% of those samples. The wider the interval, the less precise the estimate, and the more variability is expected in the model's accuracy across different samples from the population.
         
        The No Information Rate (NIR) is a baseline metric that represents the accuracy a model would achieve by simply predicting the majority class for every instance in the dataset. It serves as a reference point for evaluating the performance of a classification model. Comparing the accuracy and the NIR of the model provides context for understanding its effectiveness. If the accuracy is significantly higher than the NIR, it suggests that the model is providing valuable predictive information. If the accuracy is close to or lower than the NIR, it may indicate that the model is not performing much better than a basic baseline that predicts the majority class. The No Information Rate (NIR) baseline is 0.282. The model's accuracy of 33.11% surpasses NIR, indicating it provides valuable predictive information beyond a basic baseline.
        
        P-Value [Acc > NIR]:0.03399 This p-value is associated with a test that specifically compares the accuracy of the model to the NIR. A p-value below a chosen significance level (commonly 0.05) suggests that there is evidence to reject the null hypothesis that the accuracies are not significantly different. P-Value [Acc > NIR]: 0.03399 suggests significant difference between model accuracy and NIR. Mcnemar's Test P-Value: 3.518e-11 indicates a significant difference compared to another model or baseline.
         
        The Kappa statistic, denoted as κ (kappa), is a measure of inter-rater agreement or reliability for categorical items. Kappa is used to assess the agreement between the model's predictions and the actual outcomes. The Kappa statistic is 0.1395, showing low agreement between model predictions and outcomes. Further investigation and improvement may enhance predictive capabilities.
        
        Class-specific metrics reveal varying sensitivity and modest positive predictive values. The model shows higher sensitivity for certain grades but inconsistent positive predictions. Consideration of these metrics is crucial for understanding strengths and weaknesses and guiding refinements.
        
         
        Figure 3.2.17 ROC Curve
        Figure 3.2.17 shows the Receiver Operating Characteristic (ROC) Curve (AUC-ROC). An ROC curve is plot of sensitivity on the y-axis against (1-specificity) on the x-axis for varying values of the threshold t. the 45˚ diagonal line connecting (0,0) to (1,1) is the ROC curve corresponding to random chance. The AUC is an overall summary of diagnostic accuracy. An AUC value of 0.611 suggests that the model's discriminatory ability is slightly better than random chance (AUC =0.5).
         
        1.9	3.3 Measuring the correlation between Preparation of Exam and the CGPA 
        
        In this analysis, we will discuss mainly “ATTEND"(IV), attendance in class with the scale of Always, Sometimes, and Never. With the comparison of “CUML_GPA” (DV), cumulative grade point average in the last semester with the scale of <2.00, 2.00-2.49, 2.50-2.99, 3.00-3.49, above 3.49. I will discuss the correlation between how attendance in class affects the CGPA.
        
        1.10	3.3.1 Univariate Analysis
        
          
        Figure 3.3.1.1 : Pie chart				Figure 3.3.1.2 : Bar chart
        
        In the figure above, we have 2 charts which are the pie chart and bar chart showing us the summarized data for the Attendance in class. Firstly, in the pie chart we can see that its categories into 3 categories red which represent Always attend to class, green which Never attend to class, and lastly blue which attends to class Sometimes. While on the bar chart, we have the x-axis which represents attendance to class and y-axis which represents the frequency of students.
        
        The data in the chart shows us students' attendance in class. Around 75.2% or 1153 of the students choose to always attend class and 24.8% or 381 of the students have selected to attend class sometimes. In the graph we didn’t see the green category which also stands for student never attending class, because in the dataset we found out that none of the students never attended class.
        Furthermore, I have used the sd() function and got a result of 0.43221. A positive standard deviation shows a tail of data towards the student that attends class always.
        
        
        1.11	3.3.2 Bivariate Analysis
        
         
        Figure 3.3.2.1 : Count Plot
        Figure X shows a count plot for the relationship between attendance in class and cumulative GPA. Count plot has been used to represent bivariate data as it can help to easily visualive and understand the distribution of data between 2 variables. In the figure above, x-axis represents attendance in class which consists of 3 categories, always, sometimes, and never. Never category is not represented in the figure as there are no students who never attend class. Thus, y-axis represents cumulative GPA in 5 level which stands for 1: <2.00, 2: 2.00-2.49, 3: 2.50-2.99, 4: 3.00-3.49, 5: above 3.49.
        
        Looking into the graph, we see that most of the students who always attend class can significantly score a better grade compared to students that attend to the class sometimes. We can see that the highest frequency of students gathers at CUML_GPA “4” or 3.00-3.49 with an amount of 343 students. While students who attend classes sometimes have the highest frequency at CUML_GPA “2” or 2.00-2.49.
        
        1.12	3.3.3 Multivariate Analysis
        
               Figure 3.3.3.1 : Multivariate graph
        
        The figure above shows a multivariable graph which shows the relationship between attendance in class, taking notes in class, and cumulative GPA. On the bottom x-axis, we have the attendance in class made up with always attend, sometimes attend, and never attend to class. While on the y-axis, we have the frequency of students with the scale of taking notes include blue which stands for never, yellow which stands for sometimes, and orange which stands for always taking notes in class.
        
        According to the graph, we can clearly see students who actively participate in class have a higher frequency of higher CGPA such as 3.00-3.49. When we investigate the taking notes in class and attendance in class, we can clarify that it has no correlation between taking notes in class and the cumulative GPA. As we look into the graph even though students who always attend class and take notes during class, most students still obtain lower CUML_GPA in the scale which is 2.00-2.49.
        
        1.13	3.3.4 Chi Squared Test
        
         
        Figure 3.3.4.1 : Contigency table
         
        Figure 3.3.4.2 : Chi squared test
        Chi-squared test was commonly used to determine whether there is a significant association between two categorical variables. It is based on the comparison of observed and expected frequencies in a contingency table. A contingency table is a table that displays the frequency distribution of two categorical variables. The rows represent the attendance to class, and the columns represent the CUML_GPA. On the contingency table, we can see that the never row is empty as there are no students that never attend class. The result shows us that there is a significant association between the attendance in class and the CUML_GPA. The test statistic (X-squared) is 73.684 with 4 degrees of freedom, and the p-value is 3.781e-15. This statistic measures the difference between observed and expected frequencies in a contingency table. It shows that we have a low p-value(p≤0.05) where we have more evidence to reject the null hypothesis and have a significant association between those variables.
        
        1.14	3.3.5 Cramer V
        
         
        Figure 3.3.5.1 : Cramer V result
        Cramér's V is a measure of association between two categorical variables. It ranges from 0 to 1, with 0 indicating no association and 1 indicating a perfect association. The interpretation of Cramér's V is like other correlation coefficients. The result of correlation between attendance in class and CUML_GPA respectively shows the result of 0.1549742. Cramér's V is a measure of strength, and a value around 0.15 suggests a relatively weak association between the two categorical variables. While the association is statistically significant, the practical impact may be modest. Further investigation and consideration of the context are recommended to fully understand this association.
         
        1.15	3.3.6 Additional Feature
         
        Figure 3.3.6.1 : Decision Tree data frame
        The figure above shows a graph of decision tree’s data frame including the relationship between variables of attendance in class, preparation to midterm exams, taking notes in class, discussion improves in interest and success and the cumulative GPA. A decision tree is a predictive modeling tool used in machine learning and data analysis. It is a tree-like structure consisting of nodes, where each node represents a decision or a test on an attribute, each branch represents the outcome of the test, and each leaf node represents the predicted output (or class label). The dataset was divided into training (80%) and test (20%) sets using the caret package in R.
        
        
         
        Figure 3.3.6.2 : Probability table
        The figure above shows a probability table between “ATTEND”, “NOTES”, “LIKES_DISCUSS”, “PREP_EXAM” and “CUML_GPA”. In the figure above, we can realize that the distribution of the CUML_GPA has highest frequency at 3.00-3.49 CGPA. By looking at the data we can say that student who score higher grades (=>3.00) are most likely have the habit of always attending the class, always take notes in the class, sometimes have discussions, and preparing for exam when exams are closest to date. While going to students who have lower grades (<3.00) are mostly students who always attend to class, sometimes take notes, sometimes make discussions, and prepare for exam when it gets closest to date. These data consistently show us the correlation between the variables to the final CGPA.
        
        
         
        Figure 3.3.6.3 : Full Decision tree	
        The figure above shows a complete decision tree for the variable of attendance in class, taking notes in class, discussion impact and preparation to midterm exams to the cumulative grade. As we look into the graph, we could hardly read the data as there are too many tree nodes. Thus, we have to prune the graph for better understanding and visuality.
        
         
        Figure 3.3.6.4 : Prune decision tree
        Looking into the pruned decision tree, we can determine the sequence of the distribution. Firstly, split by the attendance in class, 77% of the students are distributed into always attend side which is the left while 23% of the remaining students are on the right side. After that, it further distributes the students with the discussion impact and the students were evenly distributed on both sides. Followed by preparation for midterm exams then taking notes in the class. For example, the probability of a particular student scoring above 3.49 CGPA who always attends class, always has discussions but never has preparation for exams is 2%.
        
         
        Figure 3.3.6.5 : Importance of each variable in decision tree			
        The variables relevance scores show how important differences in the variables will shape the predictions in the decision tree. Based on the statics, we found out that “NOTES” which represents taking notes in class take the most important roles in shaping the decision tree. Followed by “LIKES_DISCUSS” which significantly affects and “PREP_EXAM” which causes a considerable contribution in shaping the decision tree. Lastly, the “ATTEND” which provides the least amount of contribution in the decision tree.
        
         
        Figure 3.3.6.6 : Performance of decision tree
        Looking at the overall statistics, the accuracy of the decision tree is overall 38.57% which indicates that it can accurately anticipate the class label in every instance. Within 35.84% - 41.35% is where 95% confident the true accuracy lies. By comparing the NIR (No Information Rate) and the overall accuracy, the No Information Rate (NIR) baseline is 0.2815. The model's accuracy of 38.57% exceeds NIR which is 28.15%, suggesting it provides valuable predictive information beyond the basic baseline. P-Value [Acc > NIR] have the statics of 2.197e-15. This p-value is less than 0.05, suggesting that the model's accuracy is significantly better than the no information rate. Furthermore, the Kappa obtained 18.42% when measuring the agreement between the predicted and observed classifications. A Kappa of 0 indicates no agreement, and 1 indicates complete agreement. While the Kappa for this decision tree is 0.1842 which shows a fair agreement. Lastly, Mcnemar's Test P-Value got < 2.2e-16. This p-value is very small, suggesting a significant difference in error rates between the model's predictions and the actual outcomes.
        In summary, while the accuracy is better than the no information rate, the Kappa indicates only fair agreement. McNemar's Test P-Value suggests a significant difference in error rates. It might be worth exploring other evaluation metrics or improving the model to achieve better performance.
        
         
        Figure 3.3.6.7 : ROC
        The Receiver Operating Characteristic (ROC) curve is a graphical representation of the performance of a binary classification model at various classification thresholds. It illustrates the trade-off between the true positive rate (sensitivity) and the false positive rate (1-specificity) across different threshold values. True Positivity Rate is proportion of positive instances correctly identified by the model. It is calculated as True Positives/ (True Positives+False Negatives) True Positives/ (True Positives+False Negatives). As an example, this is often referred to as the rate of correctly determining the grades of students. In addition, the False Positive Rate stands for the proportion of actual negative instances that are incorrectly classified as positive by the model. It is calculated as False Positives/ (False Positives+True Negatives) False Positives/ (False Positives+True Negatives). In the following situation is an example of unsuccessful prediction of the students for low grades but turn out the opposite.
        
        
                 
        
        
        
         
            Figure 3.3.6.8 : AUC result
        
        The value "0.5745197" is the calculated AUC (Area Under the Curve) for the ROC (Receiver Operating Characteristic) curve. In context of ROC – AUC, if the AUC values are close to 0.5, it indicates a model that performs similarly to random chance while AUC values significantly above 0.5 suggest better-than-random performance. If the AUC is 1.0, it represents a perfect model.
        In this case, an AUC of 0.5745197 indicates that the model is better than random chance, but its discriminatory power is modest. While it is performing better than a random classifier, there is room for improvement. It's important to consider other evaluation metrics, domain-specific requirements, and potential adjustments to the model or features to enhance its performance.
        
         
        3.4 Tew Zhu Qing’s
        3.4.1 Univariate analysis
        Univariate analysis is a statistical method that normally focuses on analyzing and summarizing a single variable's distribution, central tendency, and variability. In this analysis, the variable that is going to be examined is “Notes” which is represented as student note-taking frequency. The variable has been derived into three levels where “1” is represented as “never”, “2” is “sometimes”, and “3” is “always”. The following data was collected as one of the independent variables in a data file namely “student prediction”. The summarized analyzing outcome of note-taking frequency is displayed as a bar chart and a pie chart as shown in Figure 3.4.1 and Figure 3.4.2.
        
          
           Figure 3.4.1Bar Chart				   Figure 3.4.2 Pie Chart	
        
        In the bar chart shown in Figure 3.4.1, the x-axis is represented as the categories of “Taking Notes” while the y-axis is the frequency of students counted in a particular category. While in the pie chart from Figure 3.4.2, the students' numbers were represented in percentages. The data shows that there are 894 or 58.3% of students have the habit of always taking notes in class, 587 or 38.3% of students sometimes take notes in class, and a small portion of 53 or 3.5% of students never take any notes while in class.
        
        
         
        3.4.2 Bivariate analysis
        Bivariate analysis differs from univariate analysis. It involves the simultaneous analysis of two variables to explore relationships, associations, patterns, and dependencies between them. In this analysis, the independent variable, “Notes”, will be analyzed the relationship with the dependent variable “CUML_GPA”. The result will be presented using count plot as it is one of the methods to visualize and gain an understanding of the relationship between two variables. 
        
         
        Figure 3.4.3 Count Plot of Cumulative GPA and Notes
        
        Figure 3.4.3 represents a count plot illustrating the relationship between cumulative GPA and taking notes in class. The x-axis categorizes note-taking habits into three different categories, while the y-axis consists of five levels of CGPA where 1(<2.00), 2(2.00-2.49), 3(2.50-2.99), 4(3.00-3.49), and 5(>3.49).  The color gradient changes with the number of students. Besides that, a summarized total of students gained their CGPA in different categories was displayed in Figure 3.4.4 where the x-axis is the categories of note-taking and the y-axis represents the number of total students involved in that particular category. 
         
        Figure 3.4.4 Stacked Bar Chart of Cumulative GPA and Notes
        As the result shown in both graphs, students with note-taking habits are more likely to have a higher opportunity to gain a better CGPA. However, there are still 240 and 65 students who take notes frequently, achieve a lower CGPA in levels 1 and 2. This discrepancy might be influenced by another variable. Thus, further investigation is needed to thoroughly explain the phenomena. 
         
         
         
         
        
        
         
         
        3.4.3 Multivariate analysis
        To further investigate the relationship between those variables and the dependent variables in the dataset, we decided to make a multivariate analysis by adding one more independent variable based on the bivariate analysis. Additional independent variable accommodations “Living” is then added to the investigation. The result is displayed in Figure 3.4.5. 
        
         
        Figure 3.4.5 Multivariate Bar Chart
        
        In Figure 3.4.5, the x-axis represents the categories of taking notes, the y-axis represents the number of students counted, and the additional variable will be differentiated by the column color. Each level of CGPA will be considered as a group along with the details of student numbers counted, note-taking, and accommodations. As the Figure shows, students who live in dormitories and always take notes in class are likely to gain a better CGPA, but the disparity between group by group is not obvious. In addition, we found that the students who live rental outside and always take notes have an outranging of number 112 students gain their CGPA in level 2, but it still has a total number of 214 students who live outside receive a better CGPA in the range of 3.00-3.49. Therefore, we can conclude that the rental environment does make a weak impact on students CGPA but the habits of note-taking are more likely to have a significant impacts in students’ CGPA. 
        
         
        3.4.4 Chi-squared test
         
        Figure 3.4.6 Chi-square Test
        
        Figure 3.4.6 shows the result of the chi-square test by calculating the frequency of the students number gained in each category. The X-squared measures the discrepancy between the observed and expected frequencies of the categorical data being analyzed. The degrees of freedom(df) represent the number of values in the final calculation of a statistic that are free to vary. The P-value is the probability of obtaining a test statistic as extreme as the one observed in the sample, which indicates the association between variables. In this case, the value of X-squared is 75.862 with 8 degrees of freedom, and the p-value is 3.313e-16. It shows that we have a low p-value(p≤0.05) where we have more evidence to reject the null hypothesis and have a significant association between those variables.
         
        3.4.5 Correlation Analysis – Cramer’s V
        Cramer’s V is a measure of association used in correlation analysis for categorical data. The value of Cramer’s V indicates the strength of the association. A value close to 0 suggests a weak or no association, while a value from 0.1 to 0.3 indicates a moderate association, and above 0.3 will be considered a strong association between the variables. In this case, the value of 0.157248 is shown in Figure 3.4.6, which indicates the variables that we examined have a moderate association.  
        
        
        
         
        3.4.6 Additional Features – Logistic Regression
        
        After gathering and analysing the necessary variables with the dependent variables, we aim to predict student success or failure in their exam using a logistic regression analysis. In this study, we are taking four independent variables which are attendance to class, preparation for midterm exams, taking notes in classes, and discussion improves personal interest and success in the course into the analysis with the dependent variable, expected cumulative grade point average.
        
          
        Figure 3.4.7 Confusion Matrix and Statistics
        Figure 3.4.7 represents the summarized data for predictions. The table shows the relations between reference and prediction where 57 is the instances that were correctly predicted as “Above”; number of 73 is the instances that were correctly predicted as “Below”; number of 80 is the instances that predicted wrongly as “Above”; and 96 is the instances that predicted wrongly as “Below”. Next, the accuracy represents the proportion of correctly classified instances out of the total instances and the No Information Rate (NIR) is the accuracy that would be achieved by always predicting the majority class. Thus, the comparison of accuracy and NIR value is presented as P-Value [Acc>NIR] where 1.0000 was listed, which indicates the model is not providing a better prediction beyond a simple class prediction. While the 95% CI shows true accuracy is likely to fall in the range of 0.3688 to 0.4824. 
        
        Cohen’s Kappa is a statistical method to measure inter-rater agreement. The value of -0.1503 provided in Figure 3.4.7 indicates the model is a slight disagreement between the model’s prediction and the actual outcomes. In addition, the sensitivity of this model is 0.4320 while the specificity is 0.4161. It shows that there is a 43.20% that the model can correctly identify all the actual positive instances and a 41.61% probability to identify correctly for all actual negative instances. Furthermore, the values of positive predictive value and negative predictive value are 0.4771 and 0.3725. It indicates that the model has a chance of 47.71% to predict the actual positive instances and 37.25% to predict the negative instances.
        
        Lastly, the prevalence of 0.5523 indicates the model with this dataset has approximately 55.23% to get a positive outcome. The detection rate, also known as the true positive rate or recall, means the model correctly predicted about 23.86% of all instances with positive outcomes while the value of detection prevalence suggests that the model predicted approximately 50.00% of instances as having a positive outcome. The balanced accuracy shows a 42.40% sensitivity and specificity, which indicates the model does not perform equally in predicting both positive and negative instances.
         
        Figure 3.4.8 Receiver Operating Characteristic Curve (ROC)
        Figure 3.4.8 shows the Receiver Operating Characteristic Curve (ROC), which illustrates the performance of a binary classification model across different classification thresholds. The x-axis consists of false positive rate, also known as specificity, while the y-axis represents true positive rate, which is sensitivity. As Figure 3.4.8 shows, at a threshold of (0.0) to (0.4) has a better performance beyond than random chance. However, it remains flat and even after the rate become bigger. 
         
        Figure 3.4.9 AUC value
        Besides that, an AUC value of 0.5666927 is displayed in figure 3.4.9. The value indicates that the model’s ability to discriminate between the positive and negative classes is fair but not highly accurate. In summary, we can conclude that the model has a limited predictive ability since the model’s performance is not particularly strong in each parameter after analyzing.  
        
         
        4.0 Conclusion
        4.1 Result Interpretation
        
        4.2 Recommendations
        
        4.3 Limitation
        Write a Conclusion`
    });
    console.log(res);

};

run();