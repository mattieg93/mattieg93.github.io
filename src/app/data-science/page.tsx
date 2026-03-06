import { TechniqueCard } from '@/components/technique-card';
import { CodeExample } from '@/components/code-example';
import { InteractiveConcept } from '@/components/interactive-concept';

export default function DataSciencePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-500 via-orange-500 to-emerald-600 bg-clip-text text-transparent mb-6">
              Data Science Techniques
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore fundamental concepts and advanced methodologies that power modern data science. 
              From statistical foundations to cutting-edge machine learning techniques, discover the tools 
              that transform raw data into actionable insights.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gray-800/50 rounded-lg p-6 text-center border border-gray-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">20+</div>
              <div className="text-gray-300 text-sm">Core Techniques</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 text-center border border-gray-700">
              <div className="text-3xl font-bold text-purple-500 mb-2">15+</div>
              <div className="text-gray-300 text-sm">Code Examples</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 text-center border border-gray-700">
              <div className="text-3xl font-bold text-emerald-400 mb-2">8+</div>
              <div className="text-gray-300 text-sm">Advanced Methods</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 text-center border border-gray-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">5+</div>
              <div className="text-gray-300 text-sm">Interactive Demos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Fundamental Techniques Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Fundamental Techniques</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Master the core concepts that form the foundation of all data science work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TechniqueCard
              title="Exploratory Data Analysis"
              category="fundamental"
              description="Systematic approach to analyzing datasets to summarize main characteristics, detect patterns, and identify anomalies."
              techniques={["Data Profiling", "Statistical Summaries", "Correlation Analysis", "Distribution Analysis"]}
              useCase="Initial data investigation and hypothesis generation"
              icon="🔍"
            />

            <TechniqueCard
              title="Statistical Hypothesis Testing"
              category="fundamental"
              description="Formal methods for making statistical decisions using data, controlling for Type I and Type II errors."
              techniques={["T-tests", "Chi-square tests", "ANOVA", "Non-parametric tests"]}
              useCase="Validating assumptions and comparing groups"
              icon="📊"
            />

            <TechniqueCard
              title="Linear & Logistic Regression"
              category="fundamental"
              description="Foundation of predictive modeling for both continuous and categorical outcome variables."
              techniques={["OLS Regression", "Ridge/Lasso", "Logistic Regression", "Model Diagnostics"]}
              useCase="Prediction and inference with interpretable models"
              icon="📈"
            />

            <TechniqueCard
              title="Data Cleaning & Preprocessing"
              category="fundamental"
              description="Techniques for handling missing data, outliers, and preparing data for analysis and modeling."
              techniques={["Missing Value Imputation", "Outlier Detection", "Feature Scaling", "Data Validation"]}
              useCase="Ensuring data quality and model readiness"
              icon="🧹"
            />

            <TechniqueCard
              title="Feature Engineering"
              category="fundamental"
              description="Creating and selecting meaningful variables that improve model performance and interpretability."
              techniques={["Feature Creation", "Selection Methods", "Dimensionality Reduction", "Encoding Techniques"]}
              useCase="Optimizing input features for better predictions"
              icon="⚙️"
            />

            <TechniqueCard
              title="Cross-Validation & Model Evaluation"
              category="fundamental"
              description="Robust methods for assessing model performance and avoiding overfitting."
              techniques={["K-fold CV", "Stratified Sampling", "Performance Metrics", "Bias-Variance Tradeoff"]}
              useCase="Reliable model assessment and selection"
              icon="✅"
            />
          </div>
        </div>
      </section>

      {/* Advanced Techniques Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Advanced Techniques</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Cutting-edge methods for complex problems and sophisticated analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TechniqueCard
              title="Ensemble Methods"
              category="advanced"
              description="Combining multiple models to create more robust and accurate predictions than individual models."
              techniques={["Random Forest", "Gradient Boosting", "XGBoost/LightGBM", "Stacking"]}
              useCase="High-performance prediction in competitions and production"
              icon="🌲"
            />

            <TechniqueCard
              title="Deep Learning"
              category="advanced"
              description="Neural networks for complex pattern recognition in structured and unstructured data."
              techniques={["Neural Networks", "CNNs", "RNNs/LSTMs", "Transfer Learning"]}
              useCase="Computer vision, NLP, and complex pattern recognition"
              icon="🧠"
            />

            <TechniqueCard
              title="Time Series Analysis"
              category="advanced"
              description="Specialized techniques for analyzing and forecasting sequential, time-dependent data."
              techniques={["ARIMA Models", "Seasonal Decomposition", "Prophet", "LSTM Forecasting"]}
              useCase="Financial forecasting, demand planning, trend analysis"
              icon="📅"
            />

            <TechniqueCard
              title="Unsupervised Learning"
              category="advanced"
              description="Finding hidden patterns and structures in data without labeled examples."
              techniques={["K-means Clustering", "Hierarchical Clustering", "PCA", "t-SNE/UMAP"]}
              useCase="Customer segmentation, anomaly detection, data exploration"
              icon="🎯"
            />

            <TechniqueCard
              title="Causal Inference"
              category="advanced"
              description="Methods for identifying causal relationships and estimating treatment effects from observational data."
              techniques={["A/B Testing", "Instrumental Variables", "Difference-in-Differences", "Propensity Scoring"]}
              useCase="Understanding causality and measuring intervention impacts"
              icon="🔄"
            />

            <TechniqueCard
              title="Natural Language Processing"
              category="advanced"
              description="Extracting insights from text data using computational linguistics and machine learning."
              techniques={["Text Preprocessing", "Sentiment Analysis", "Topic Modeling", "Named Entity Recognition"]}
              useCase="Social media analysis, document classification, chatbots"
              icon="💬"
            />

            <TechniqueCard
              title="Bayesian Methods"
              category="advanced"
              description="Probabilistic approach to machine learning incorporating prior knowledge and uncertainty quantification."
              techniques={["Bayesian Regression", "MCMC Sampling", "Probabilistic Programming", "Uncertainty Quantification"]}
              useCase="Small data problems, uncertainty estimation, decision making"
              icon="🎲"
            />

            <TechniqueCard
              title="Optimization Techniques"
              category="advanced"
              description="Mathematical methods for finding optimal solutions in complex, constrained problems."
              techniques={["Linear Programming", "Genetic Algorithms", "Gradient Descent", "Hyperparameter Tuning"]}
              useCase="Resource allocation, portfolio optimization, model tuning"
              icon="🎛️"
            />
          </div>
        </div>
      </section>

      {/* Interactive Code Examples Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Code Examples & Implementation</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Practical implementations demonstrating key techniques in Python and R
            </p>
          </div>

          <div className="space-y-12">
            <CodeExample
              title="Exploratory Data Analysis Pipeline"
              description="A comprehensive EDA workflow for understanding dataset characteristics"
              language="python"
              code={`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

def comprehensive_eda(df):
    """
    Comprehensive Exploratory Data Analysis pipeline
    """
    print("=== DATASET OVERVIEW ===")
    print(f"Shape: {df.shape}")
    print(f"Memory usage: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
    
    # Missing data analysis
    missing_data = df.isnull().sum()
    missing_percent = (missing_data / len(df)) * 100
    missing_df = pd.DataFrame({
        'Missing Count': missing_data,
        'Missing Percentage': missing_percent
    }).sort_values('Missing Percentage', ascending=False)
    
    print("\\n=== MISSING DATA ===")
    print(missing_df[missing_df['Missing Count'] > 0])
    
    # Numerical columns analysis
    numerical_cols = df.select_dtypes(include=[np.number]).columns
    if len(numerical_cols) > 0:
        print("\\n=== NUMERICAL VARIABLES ===")
        print(df[numerical_cols].describe())
        
        # Detect outliers using IQR method
        for col in numerical_cols:
            Q1 = df[col].quantile(0.25)
            Q3 = df[col].quantile(0.75)
            IQR = Q3 - Q1
            outliers = df[(df[col] < Q1 - 1.5*IQR) | (df[col] > Q3 + 1.5*IQR)]
            print(f"{col}: {len(outliers)} outliers ({len(outliers)/len(df)*100:.1f}%)")
    
    # Categorical columns analysis
    categorical_cols = df.select_dtypes(include=['object', 'category']).columns
    if len(categorical_cols) > 0:
        print("\\n=== CATEGORICAL VARIABLES ===")
        for col in categorical_cols:
            unique_count = df[col].nunique()
            print(f"{col}: {unique_count} unique values")
            if unique_count <= 10:  # Show distribution for low-cardinality vars
                print(df[col].value_counts().head())
    
    return missing_df, numerical_cols, categorical_cols

# Example usage
# missing_info, num_cols, cat_cols = comprehensive_eda(your_dataframe)`}
              applications={["Data Quality Assessment", "Initial Pattern Discovery", "Feature Selection Preparation"]}
            />

            <CodeExample
              title="Advanced Feature Engineering Pipeline"
              description="Automated feature engineering with polynomial features, interactions, and domain-specific transformations"
              language="python"
              code={`from sklearn.preprocessing import StandardScaler, PolynomialFeatures, OneHotEncoder
from sklearn.feature_selection import SelectKBest, f_regression
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
import pandas as pd
import numpy as np

class AdvancedFeatureEngineer:
    """
    Advanced feature engineering pipeline with multiple transformation strategies
    """
    
    def __init__(self, polynomial_degree=2, interaction_only=False, k_best=10):
        self.polynomial_degree = polynomial_degree
        self.interaction_only = interaction_only
        self.k_best = k_best
        self.feature_names_ = None
        
    def create_time_features(self, df, date_col):
        """Extract comprehensive time-based features"""
        df[date_col] = pd.to_datetime(df[date_col])
        
        time_features = {
            f'{date_col}_year': df[date_col].dt.year,
            f'{date_col}_month': df[date_col].dt.month,
            f'{date_col}_day': df[date_col].dt.day,
            f'{date_col}_dayofweek': df[date_col].dt.dayofweek,
            f'{date_col}_quarter': df[date_col].dt.quarter,
            f'{date_col}_is_weekend': (df[date_col].dt.dayofweek >= 5).astype(int),
            f'{date_col}_is_month_end': df[date_col].dt.is_month_end.astype(int),
            f'{date_col}_days_since_epoch': (df[date_col] - pd.Timestamp('1970-01-01')).dt.days
        }
        
        return pd.concat([df, pd.DataFrame(time_features)], axis=1)
    
    def create_aggregation_features(self, df, group_col, agg_cols, agg_funcs=['mean', 'std', 'min', 'max']):
        """Create aggregation features by grouping"""
        agg_features = {}
        
        for agg_col in agg_cols:
            for func in agg_funcs:
                feature_name = f'{group_col}_{agg_col}_{func}'
                agg_features[feature_name] = df.groupby(group_col)[agg_col].transform(func)
        
        return pd.concat([df, pd.DataFrame(agg_features)], axis=1)
    
    def create_ratio_features(self, df, numerator_cols, denominator_cols):
        """Create meaningful ratio features"""
        ratio_features = {}
        
        for num_col in numerator_cols:
            for den_col in denominator_cols:
                if num_col != den_col:
                    feature_name = f'{num_col}_to_{den_col}_ratio'
                    # Avoid division by zero
                    ratio_features[feature_name] = df[num_col] / (df[den_col] + 1e-8)
        
        return pd.concat([df, pd.DataFrame(ratio_features)], axis=1)
    
    def build_pipeline(self, numerical_cols, categorical_cols):
        """Build comprehensive preprocessing pipeline"""
        
        # Numerical preprocessing
        numerical_pipeline = Pipeline([
            ('scaler', StandardScaler()),
            ('poly', PolynomialFeatures(
                degree=self.polynomial_degree, 
                interaction_only=self.interaction_only,
                include_bias=False
            )),
            ('selector', SelectKBest(score_func=f_regression, k=self.k_best))
        ])
        
        # Categorical preprocessing  
        categorical_pipeline = Pipeline([
            ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
        ])
        
        # Combine preprocessing steps
        preprocessor = ColumnTransformer([
            ('num', numerical_pipeline, numerical_cols),
            ('cat', categorical_pipeline, categorical_cols)
        ])
        
        return preprocessor

# Example usage:
# engineer = AdvancedFeatureEngineer(polynomial_degree=2, k_best=50)
# df_engineered = engineer.create_time_features(df, 'date_column')
# df_engineered = engineer.create_aggregation_features(df_engineered, 'category', ['sales', 'quantity'])
# pipeline = engineer.build_pipeline(numerical_cols, categorical_cols)`}
              applications={["Automated ML Pipelines", "Feature Discovery", "Model Performance Enhancement"]}
            />

            <CodeExample
              title="Statistical Hypothesis Testing Framework"
              description="Comprehensive statistical testing suite with effect size calculations and power analysis"
              language="python"
              code={`import numpy as np
import pandas as pd
from scipy import stats
from scipy.stats import chi2_contingency, fisher_exact
from statsmodels.stats.power import ttest_power
from statsmodels.stats.proportion import proportions_ztest
import warnings

class StatisticalTester:
    """
    Comprehensive statistical testing framework with automated test selection
    """
    
    def __init__(self, alpha=0.05):
        self.alpha = alpha
        self.results = {}
    
    def normality_test(self, data, test='shapiro'):
        """Test for normality using multiple methods"""
        tests = {
            'shapiro': stats.shapiro,
            'normaltest': stats.normaltest,
            'anderson': stats.anderson
        }
        
        if test == 'anderson':
            stat, critical_vals, sig_level = tests[test](data)
            p_value = None  # Anderson-Darling doesn't provide p-value directly
            is_normal = stat < critical_vals[2]  # 5% significance level
        else:
            stat, p_value = tests[test](data)
            is_normal = p_value > self.alpha
            
        return {
            'test': test,
            'statistic': stat,
            'p_value': p_value,
            'is_normal': is_normal,
            'alpha': self.alpha
        }
    
    def compare_two_groups(self, group1, group2, paired=False, var_equal=None):
        """
        Intelligent two-group comparison with automatic test selection
        """
        # Remove missing values
        group1_clean = np.array(group1)[~np.isnan(group1)]
        group2_clean = np.array(group2)[~np.isnan(group2)]
        
        n1, n2 = len(group1_clean), len(group2_clean)
        
        # Check normality
        norm1 = self.normality_test(group1_clean)
        norm2 = self.normality_test(group2_clean)
        both_normal = norm1['is_normal'] and norm2['is_normal']
        
        # Calculate effect size (Cohen's d)
        pooled_std = np.sqrt(((n1-1)*np.var(group1_clean, ddof=1) + 
                              (n2-1)*np.var(group2_clean, ddof=1)) / (n1+n2-2))
        cohens_d = (np.mean(group1_clean) - np.mean(group2_clean)) / pooled_std
        
        # Select appropriate test
        if paired:
            if both_normal:
                stat, p_value = stats.ttest_rel(group1_clean, group2_clean)
                test_used = "Paired t-test"
            else:
                stat, p_value = stats.wilcoxon(group1_clean, group2_clean)
                test_used = "Wilcoxon signed-rank test"
        else:
            if both_normal:
                if var_equal is None:
                    # Levene's test for equal variances
                    _, levene_p = stats.levene(group1_clean, group2_clean)
                    var_equal = levene_p > self.alpha
                
                stat, p_value = stats.ttest_ind(group1_clean, group2_clean, 
                                               equal_var=var_equal)
                test_used = f"Independent t-test (equal_var={var_equal})"
            else:
                stat, p_value = stats.mannwhitneyu(group1_clean, group2_clean,
                                                  alternative='two-sided')
                test_used = "Mann-Whitney U test"
        
        # Power analysis
        power = ttest_power(cohens_d, n1, alpha=self.alpha)
        
        return {
            'test_used': test_used,
            'statistic': stat,
            'p_value': p_value,
            'significant': p_value < self.alpha,
            'effect_size_cohens_d': cohens_d,
            'power': power,
            'sample_sizes': (n1, n2),
            'normality_group1': norm1['is_normal'],
            'normality_group2': norm2['is_normal'],
            'alpha': self.alpha
        }
    
    def categorical_association(self, var1, var2, method='auto'):
        """
        Test association between categorical variables
        """
        # Create contingency table
        contingency_table = pd.crosstab(var1, var2)
        
        # Choose test based on table characteristics
        if method == 'auto':
            min_expected = 5
            chi2_stat, chi2_p, dof, expected = chi2_contingency(contingency_table)
            
            if contingency_table.shape == (2, 2) and (expected < min_expected).any():
                # Use Fisher's exact test for 2x2 tables with low expected frequencies
                odds_ratio, fisher_p = fisher_exact(contingency_table)
                test_used = "Fisher's exact test"
                statistic = odds_ratio
                p_value = fisher_p
            else:
                # Use Chi-square test
                test_used = "Chi-square test of independence"
                statistic = chi2_stat
                p_value = chi2_p
        
        # Calculate effect size (Cramér's V)
        n = contingency_table.sum().sum()
        cramers_v = np.sqrt(chi2_stat / (n * (min(contingency_table.shape) - 1)))
        
        return {
            'test_used': test_used,
            'statistic': statistic,
            'p_value': p_value,
            'significant': p_value < self.alpha,
            'effect_size_cramers_v': cramers_v,
            'contingency_table': contingency_table,
            'degrees_of_freedom': dof if 'dof' in locals() else None,
            'alpha': self.alpha
        }

# Example usage:
# tester = StatisticalTester(alpha=0.05)
# result = tester.compare_two_groups(treatment_group, control_group)
# print(f"Test: {result['test_used']}")
# print(f"P-value: {result['p_value']:.4f}")
# print(f"Effect size (Cohen's d): {result['effect_size_cohens_d']:.4f}")
# print(f"Statistical power: {result['power']:.4f}")`}
              applications={["A/B Testing", "Experimental Design", "Research Validation"]}
            />
          </div>
        </div>
      </section>

      {/* Interactive Concepts Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Interactive Concepts</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Visualize and interact with key data science concepts to deepen understanding
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <InteractiveConcept
              title="Bias-Variance Tradeoff"
              description="Explore how model complexity affects bias, variance, and overall error"
              concept="bias-variance"
            />

            <InteractiveConcept
              title="Central Limit Theorem"
              description="See how sample means approach normal distribution as sample size increases"
              concept="central-limit"
            />

            <InteractiveConcept
              title="Overfitting Visualization"
              description="Watch how model complexity can lead to overfitting on training data"
              concept="overfitting"
            />

            <InteractiveConcept
              title="Feature Scaling Impact"
              description="Compare algorithm performance with different scaling methods"
              concept="scaling"
            />
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Best Practices & Guidelines</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Industry standards and proven methodologies for professional data science work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-white mb-4">Project Structure</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Consistent directory organization</li>
                <li>• Version control for code and data</li>
                <li>• Reproducible environments</li>
                <li>• Clear documentation</li>
                <li>• Automated testing pipelines</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-4">Model Development</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Start simple, iterate complexity</li>
                <li>• Proper train/validation/test splits</li>
                <li>• Cross-validation for model selection</li>
                <li>• Feature importance analysis</li>
                <li>• Performance monitoring in production</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-4">Code Quality</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Modular, reusable functions</li>
                <li>• Comprehensive error handling</li>
                <li>• Code review processes</li>
                <li>• Performance optimization</li>
                <li>• Security best practices</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-4">Data Ethics</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Privacy-preserving techniques</li>
                <li>• Bias detection and mitigation</li>
                <li>• Transparent model decisions</li>
                <li>• Responsible data collection</li>
                <li>• Regular fairness audits</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold text-white mb-4">MLOps Practices</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Automated model deployment</li>
                <li>• Continuous integration/delivery</li>
                <li>• Model versioning and tracking</li>
                <li>• A/B testing frameworks</li>
                <li>• Rollback strategies</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-white mb-4">Communication</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Clear, actionable insights</li>
                <li>• Audience-appropriate visualizations</li>
                <li>• Uncertainty quantification</li>
                <li>• Business impact metrics</li>
                <li>• Storytelling with data</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-emerald-600/20 rounded-2xl p-12 border border-purple-500/30">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Apply These Techniques?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore my portfolio projects to see these data science techniques applied to real-world problems, 
              or get in touch to discuss how these methods can solve your business challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/projects"
                className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                View Project Portfolio
              </a>
              <a
                href="/contact"
                className="px-8 py-3 bg-transparent border-2 rounded-lg font-semibold transition-all duration-300"
                style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
              >
                Discuss Your Project
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}