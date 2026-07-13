/* ================================================
   SAKURA DATABASE APP — Main Script
   Petals · Book · Timeline · Lesson Viewer
   ================================================ */
(function () {
'use strict';

/* ==========================================================
   DATA
   ========================================================== */

const BOOK_DATA = {
    manual: {
        label: 'MANUAL', coverTitle: 'Database<br>Manual',
        coverSubtitle: 'Course Recap — Babeș-Bolyai University',
        pageHeader: 'Table of Contents',
        pageSubtitle: 'Select a chapter to begin your revision journey',
        chapters: [
            { id:'course-recap', title:'Course Recap Explained',
              icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
              desc:'All course essentials from Babeș-Bolyai — both semesters, SQL, DBMS, platform connectivity, and SupaBase utilities.' },
            { id:'seminar-labs', title:'Seminars & Laboratories',
              icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
              desc:'Every seminar and lab exercise solved step-by-step with thorough explanations.' },
            { id:'exam-papers', title:'Exam Papers & Solutions',
              icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>`,
              desc:'Curated exam essentials — practical SQL problems with complete worked solutions.' }
        ]
    },
    building: {
        label: 'BUILDING', coverTitle: 'Database<br>Projects',
        coverSubtitle: 'Hands-on Building — Practical Applications',
        pageHeader: 'Project Catalogue',
        pageSubtitle: 'Choose a project to explore its implementation',
        chapters: [
            { id:'restaurant', title:'Restaurant Management',
              icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
              desc:'Complete restaurant system — dish catalogues, reservations, order tracking, and plotted sales analytics.' },
            { id:'bank', title:'Bank Management',
              icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 6l7-3 7 3"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="8" y1="10" x2="8" y2="21"/><line x1="12" y1="10" x2="12" y2="21"/><line x1="16" y1="10" x2="16" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/></svg>`,
              desc:'Full-featured banking system with accounts, transactions, loans, and financial dashboards.' },
            { id:'student-records', title:'Student Records System',
              icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"/></svg>`,
              desc:'Academic records — enrollment, grades, GPA calculations, and performance visualizations.' }
        ]
    }
};

/* ---------- TIMELINE DATA ---------- */
const TIMELINE_DATA = {
    'course-recap': {
        title: 'Course Recap Explained',
        subtitle: 'Drag to scroll through the chapters',
        bubbles: [
            { id:'ch1', num:'CH.1', label:'Data Types', popupTitle:'Chapter 1 — Data Types', popupDesc:'Exploring SQL data types: INT, VARCHAR, BOOL, FLOAT, DATE, TEXT and when to use each one.', hasLesson: true },
            { id:'ch2', num:'CH.2', label:'Creating Tables', popupTitle:'Chapter 2 — Creating Tables', popupDesc:'The CREATE TABLE statement, column definitions, constraints, and best practices.', hasLesson: true },
            { id:'ch3', num:'CH.3', label:'Keys & Relations', popupTitle:'Chapter 3 — Keys & Relationships', popupDesc:'Primary vs Foreign keys, parent and child tables, referential integrity.', hasLesson: true },
            { id:'ch4', num:'CH.4', label:'Normal Forms', popupTitle:'Chapter 4 — Normalization', popupDesc:'Schema refinement, functional dependencies, 1NF, 2NF, 3NF, BCNF, and decompositions.', hasLesson: true },
            { id:'ch5', num:'CH.5', label:'Relational Algebra', popupTitle:'Chapter 5 — Relational Algebra', popupDesc:'Fundamental operators: Select, Project, Join, Set Operations, and query execution plans.', hasLesson: true },
            { id:'ch6', num:'CH.6', label:'Class Mapping', popupTitle:'Chapter 6 — Class Mapping', popupDesc:'Mapping classes, relationships, multiplicities, inheritance, and compositions to tables.', hasLesson: true },
            { id:'ch7', num:'CH.7', label:'SQL Joins', popupTitle:'Chapter 7 — SQL Joins in Detail', popupDesc:'Inner Joins, Left/Right/Full Outer Joins, Cross Joins, and Self Joins.', hasLesson: true },
            { id:'ch8', num:'CH.8', label:'Grouping & Agg', popupTitle:'Chapter 8 — Grouping & Aggregations', popupDesc:'COUNT, SUM, AVG, MIN, MAX, GROUP BY, and HAVING filters.', hasLesson: true },
            { id:'ch9', num:'CH.9', label:'Subqueries & CTEs', popupTitle:'Chapter 9 — Subqueries & CTEs', popupDesc:'Subqueries in SELECT/WHERE, and Common Table Expressions (WITH queries).', hasLesson: true },
            { id:'ch10', num:'CH.10', label:'SQL Functions', popupTitle:'Chapter 10 — Built-in SQL Functions', popupDesc:'String manipulation, Math operations, and Date-time functions.', hasLesson: true },
            { id:'ch11', num:'CH.11', label:'Set & Window', popupTitle:'Chapter 11 — Set & Window Functions', popupDesc:'UNION, INTERSECT, EXCEPT, and Windowing (ROW_NUMBER, RANK, partition).', hasLesson: true },
            { id:'ch12', num:'CH.12', label:'DB Creation', popupTitle:'Chapter 12 — Creating Databases', popupDesc:'Database creation, deletion, schemas, collations, and character sets.', hasLesson: true },
            { id:'ch13', num:'CH.13', label:'DDL Altering', popupTitle:'Chapter 13 — DDL Altering', popupDesc:'Modifying columns, dropping columns, adding constraints.', hasLesson: true },
            { id:'ch14', num:'CH.14', label:'DML Write', popupTitle:'Chapter 14 — DML Write Queries', popupDesc:'Row insertions, parameterized updates, and bulk queries.', hasLesson: true },
            { id:'ch15', num:'CH.15', label:'DML Delete', popupTitle:'Chapter 15 — DML Delete Queries', popupDesc:'DELETE FROM vs. TRUNCATE TABLE vs. DROP TABLE differences.', hasLesson: true },
            { id:'ch16', num:'CH.16', label:'Intro Supabase', popupTitle:'Chapter 16 — Intro to Supabase', popupDesc:'Postgres-based Firebase alternative, project setup, and table editor.', hasLesson: true },
            { id:'ch17', num:'CH.17', label:'Supabase Auth', popupTitle:'Chapter 17 — Supabase Auth & RLS', popupDesc:'Email/Password signup, sessions, and Row Level Security (RLS) policies.', hasLesson: true },
            { id:'ch18', num:'CH.18', label:'Supabase Storage', popupTitle:'Chapter 18 — Supabase Storage & RT', popupDesc:'File storage buckets, policy configs, and realtime database listeners.', hasLesson: true },
            { id:'ch19', num:'CH.19', label:'Supabase JS Client', popupTitle:'Chapter 19 — Supabase JS Connection', popupDesc:'Initializing @supabase/supabase-js, client keys, and basic CRUD commands.', hasLesson: true },
            { id:'ch20', num:'CH.20', label:'Web Connection', popupTitle:'Chapter 20 — Database in Web Apps', popupDesc:'Node/Express API backend, PostgreSQL pool clients, and React frontend hooks.', hasLesson: true },
            { id:'ch21', num:'CH.21', label:'App Integration', popupTitle:'Chapter 21 — Python & C# Integration', popupDesc:'Connecting databases via Python (SQLAlchemy) and C# (.NET Entity Framework).', hasLesson: true }
        ]
    },
    'seminar-labs': {
        title: 'Seminars & Laboratories',
        subtitle: 'Drag to scroll through the labs',
        bubbles: Array.from({length:10}, (_,i) => ({
            id:`lab${i+1}`, num:`L${i+1}`, label:`Lab ${i+1}`,
            popupTitle:`Laboratory ${i+1}`, popupDesc:'Content coming soon — exercises and solutions will be added here.',
            hasLesson: false
        }))
    },
    'exam-papers': {
        title: 'Exam Papers & Solutions',
        subtitle: 'Drag to scroll through the exam parts',
        bubbles: [
            { id:'exam1', num:'E1', label:'Exam Part 1', popupTitle:'Exam Part 1', popupDesc:'First section of the exam focusing on fundamental SQL queries and schema design.', hasLesson: false },
            { id:'exam2', num:'E2', label:'Exam Part 2', popupTitle:'Exam Part 2', popupDesc:'Advanced queries, joins, subqueries, and aggregate functions.', hasLesson: false },
            { id:'exam3', num:'E3', label:'Exam Part 3', popupTitle:'Exam Part 3', popupDesc:'Complex scenarios — stored procedures, triggers, and optimization challenges.', hasLesson: false },
        ]
    }
};

/* ---------- LESSON PAGES ---------- */
const LESSON_PAGES = {
    ch1: [
        // Page 1 — Title
        `<div class="page-chapter-label">Chapter 1</div>
         <h2>SQL Data Types</h2>
         <hr class="page-divider">
         <p>Every column in a database table must have a <strong>data type</strong>. It tells the DBMS what kind of value to expect, how much storage to allocate, and what operations are valid.</p>
         <p>Choosing the right data type is critical for <strong>performance</strong>, <strong>storage efficiency</strong>, and <strong>data integrity</strong>. Let's explore the most commonly used types.</p>
         <div class="diagram-box">
            <div class="diagram-title">Data Type Categories</div>
            <div class="type-cards">
                <div class="type-card"><div class="type-card-name">Numeric</div><div class="type-card-info">INT, FLOAT, DECIMAL, SMALLINT, BIGINT</div><span class="type-card-tag numeric">Numbers</span></div>
                <div class="type-card"><div class="type-card-name">Text / String</div><div class="type-card-info">VARCHAR, CHAR, TEXT, NVARCHAR</div><span class="type-card-tag text">Characters</span></div>
                <div class="type-card"><div class="type-card-name">Date & Time</div><div class="type-card-info">DATE, TIME, DATETIME, TIMESTAMP</div><span class="type-card-tag other">Temporal</span></div>
                <div class="type-card"><div class="type-card-name">Boolean</div><div class="type-card-info">BIT / BOOLEAN — TRUE or FALSE</div><span class="type-card-tag other">Logic</span></div>
            </div>
         </div>`,

        // Page 2 — Numeric types
        `<div class="page-chapter-label">Chapter 1 — Numeric Types</div>
         <h2>Numbers in SQL</h2>
         <hr class="page-divider">
         <h3 class="h3-tip-trigger"><span class="h3-icon">#</span> Integer Types<span class="h3-tooltip"><span class="h3-tooltip-badge">Analyst Tip</span><span class="h3-tooltip-text">You will probably use <strong>INT</strong> values for basic projects (like keys or counters), but as a data analyst, you will mostly work with fractional types like <strong>FLOAT</strong>, <strong>REAL</strong>, or <strong>DECIMAL</strong> for calculations and metrics, alongside <strong>DATETIME</strong> for time-series trends.</span></h3>
         <p>Integers store whole numbers. The main difference between them is the <strong>range of values</strong> they can hold:</p>
         <table class="compare-table" data-table-id="ch1-integers">
            <tr><th>Type</th><th>Size</th><th>Range</th><th>Use Case</th></tr>
            <tr><td><code>TINYINT</code></td><td>1 byte</td><td>0 to 255</td><td>Age, status flags</td></tr>
            <tr><td><code>SMALLINT</code></td><td>2 bytes</td><td>−32,768 to 32,767</td><td>Year, small counters</td></tr>
            <tr><td><code>INT</code></td><td>4 bytes</td><td>−2.1B to 2.1B</td><td>IDs, quantities (most used)</td></tr>
            <tr><td><code>BIGINT</code></td><td>8 bytes</td><td>±9.2 quintillion</td><td>Large counters, timestamps</td></tr>
         </table>
         <h3><span class="h3-icon">%</span> Decimal / Floating Types</h3>
         <table class="compare-table" data-table-id="ch1-decimals">
            <tr><th>Type</th><th>Precision</th><th>Use Case</th></tr>
            <tr><td><code>FLOAT</code></td><td>~7 digits</td><td>Scientific data (approximate)</td></tr>
            <tr><td><code>REAL</code></td><td>~15 digits</td><td>More precise floats</td></tr>
            <tr><td><code>DECIMAL(p,s)</code></td><td>Exact</td><td>Money, financial data (most used)</td></tr>
         </table>
         <div class="sql-block"><code><span class="sql-comment">-- Example: price column with 2 decimal places</span>
<span class="sql-kw">CREATE TABLE</span> Products (
    price <span class="sql-type">DECIMAL</span>(10, 2)  <span class="sql-comment">-- up to 99999999.99</span>
);</code></div>`,

        // Page 3 — String types
        `<div class="page-chapter-label">Chapter 1 — String Types</div>
         <h2>Text & Characters</h2>
         <hr class="page-divider">
         <h3><span class="h3-icon">Aa</span> Character Types</h3>
         <p>String types store text data. The key choice is between <strong>fixed-length</strong> and <strong>variable-length</strong>:</p>
         <div class="type-cards">
            <div class="type-card">
                <div class="type-card-name">CHAR(n)</div>
                <div class="type-card-info"><strong>Fixed-length.</strong> Always uses exactly n bytes. Padded with spaces if shorter. Best for codes like country codes (e.g., 'US', 'RO').</div>
                <span class="type-card-tag text">Fixed</span>
            </div>
            <div class="type-card">
                <div class="type-card-name">VARCHAR(n)</div>
                <div class="type-card-info"><strong>Variable-length.</strong> Uses only as much space as needed (up to n). The most common string type.</div>
                <span class="type-card-tag text">Variable</span>
            </div>
            <div class="type-card">
                <div class="type-card-name">TEXT</div>
                <div class="type-card-info"><strong>Large text.</strong> For very long strings (articles, descriptions). No length limit specified. Cannot be used in indexes easily.</div>
                <span class="type-card-tag text">Unlimited</span>
            </div>
            <div class="type-card">
                <div class="type-card-name">NVARCHAR(n)</div>
                <div class="type-card-info"><strong>Unicode variable-length.</strong> Supports international characters (中文, العربية, ñ). Uses 2 bytes per character.</div>
                <span class="type-card-tag text">Unicode</span>
            </div>
         </div>
         <div class="sql-block"><code><span class="sql-comment">-- VARCHAR is the go-to for most text columns</span>
<span class="sql-kw">CREATE TABLE</span> Students (
    name       <span class="sql-type">VARCHAR</span>(100),     <span class="sql-comment">-- up to 100 chars</span>
    country    <span class="sql-type">CHAR</span>(2),           <span class="sql-comment">-- always 2 chars</span>
    bio        <span class="sql-type">TEXT</span>               <span class="sql-comment">-- unlimited length</span>
);</code></div>`,

        // Page 4 — BOOL & Date
        `<div class="page-chapter-label">Chapter 1 — Boolean & Date</div>
         <h2>Boolean & Date Types</h2>
         <hr class="page-divider">
         <h3><span class="h3-icon">T/F</span> Boolean (BIT)</h3>
         <p>Stores <strong>TRUE</strong> or <strong>FALSE</strong> values. In SQL Server, this is the <code>BIT</code> type (0 = false, 1 = true). In PostgreSQL and MySQL, you can use <code>BOOLEAN</code>.</p>
         <div class="sql-block"><code><span class="sql-kw">CREATE TABLE</span> Users (
    is_active  <span class="sql-type">BIT</span> <span class="sql-kw">DEFAULT</span> 1,      <span class="sql-comment">-- true by default</span>
    is_admin   <span class="sql-type">BIT</span> <span class="sql-kw">DEFAULT</span> 0       <span class="sql-comment">-- false by default</span>
);</code></div>

         <h3><span class="h3-icon">::</span> Date & Time Types</h3>
         <table class="compare-table" data-table-id="ch1-datetime">
            <tr><th>Type</th><th>Format</th><th>Example</th><th>Use Case</th></tr>
            <tr><td><code>DATE</code></td><td>YYYY-MM-DD</td><td>2025-06-22</td><td>Birthdays, deadlines</td></tr>
            <tr><td><code>TIME</code></td><td>HH:MM:SS</td><td>14:30:00</td><td>Schedules, shifts</td></tr>
            <tr><td><code>DATETIME</code></td><td>YYYY-MM-DD HH:MM:SS</td><td>2025-06-22 14:30:00</td><td>Created/Updated timestamps (most used)</td></tr>
            <tr><td><code>TIMESTAMP</code></td><td>Auto UTC</td><td>Auto-generated</td><td>Change tracking</td></tr>
         </table>
         <div class="sql-block"><code><span class="sql-kw">CREATE TABLE</span> Orders (
    order_date   <span class="sql-type">DATETIME</span> <span class="sql-kw">DEFAULT</span> <span class="sql-fn">GETDATE</span>(),
    delivery_by  <span class="sql-type">DATE</span>
);</code></div>`,

        // Page 5 — Summary
        `<div class="page-chapter-label">Chapter 1 — Summary</div>
         <h2>Quick Reference Card</h2>
         <hr class="page-divider">
         <p>Here's a cheat sheet of the most important data types you'll use throughout the course:</p>
         <table class="compare-table" data-table-id="ch1-reference">
            <tr><th>Type</th><th>Category</th><th>When to Use</th></tr>
            <tr><td><code>INT</code></td><td>Numeric</td><td>IDs, counts, quantities — your default integer</td></tr>
            <tr><td><code>DECIMAL(p,s)</code></td><td>Numeric</td><td>Money, prices — when you need exact precision</td></tr>
            <tr><td><code>VARCHAR(n)</code></td><td>Text</td><td>Names, emails, addresses — most common text type</td></tr>
            <tr><td><code>CHAR(n)</code></td><td>Text</td><td>Fixed codes — country codes, status codes</td></tr>
            <tr><td><code>TEXT</code></td><td>Text</td><td>Long content — descriptions, articles, notes</td></tr>
            <tr><td><code>BIT</code></td><td>Boolean</td><td>True/false flags — is_active, is_verified</td></tr>
            <tr><td><code>DATE</code></td><td>Temporal</td><td>Calendar dates — birthdays, deadlines</td></tr>
            <tr><td><code>DATETIME</code></td><td>Temporal</td><td>Precise timestamps — created_at, updated_at</td></tr>
         </table>
         <p style="margin-top:16px;text-align:center;color:#a8346e;font-weight:600;">Tip: Always choose the <em>smallest</em> type that fits your data for better performance!</p>`
    ],

    ch2: [
        // Page 1 — Title
        `<div class="page-chapter-label">Chapter 2</div>
         <h2>Creating Tables</h2>
         <hr class="page-divider">
         <p>Tables are the core building blocks of any relational database. A table represents an <strong>entity</strong> (like Students, Orders, or Products) and each row is a single <strong>record</strong>.</p>
         <p>The <code>CREATE TABLE</code> statement defines the structure: column names, data types, and constraints.</p>
         <div class="diagram-box">
            <div class="diagram-title">Anatomy of a Table</div>
            <table class="compare-table" style="margin:0" data-table-id="ch2-anatomy">
                <tr><th>StudentID</th><th>Name</th><th>Email</th><th>Age</th><th>Active</th></tr>
                <tr><td>1</td><td>Maria</td><td>maria@ubb.ro</td><td>21</td><td>✓</td></tr>
                <tr><td>2</td><td>Andrei</td><td>andrei@ubb.ro</td><td>22</td><td>✓</td></tr>
                <tr><td>3</td><td>Elena</td><td>elena@ubb.ro</td><td>20</td><td>✗</td></tr>
            </table>
         </div>`,

        // Page 2 — Syntax
        `<div class="page-chapter-label">Chapter 2 — Syntax</div>
         <h2>CREATE TABLE Syntax</h2>
         <hr class="page-divider">
         <h3><span class="h3-icon">{}</span> Basic Structure</h3>
         <div class="sql-block"><code><span class="sql-kw">CREATE TABLE</span> TableName (
    column1  <span class="sql-type">datatype</span>  constraint,
    column2  <span class="sql-type">datatype</span>  constraint,
    ...
);</code></div>
         <h3><span class="h3-icon">></span> Real Example</h3>
         <div class="sql-block"><code><span class="sql-kw">CREATE TABLE</span> Students (
    StudentID   <span class="sql-type">INT</span>           <span class="sql-kw">PRIMARY KEY</span> <span class="sql-kw">IDENTITY</span>(1,1),
    FirstName   <span class="sql-type">VARCHAR</span>(50)   <span class="sql-kw">NOT NULL</span>,
    LastName    <span class="sql-type">VARCHAR</span>(50)   <span class="sql-kw">NOT NULL</span>,
    Email       <span class="sql-type">VARCHAR</span>(100)  <span class="sql-kw">UNIQUE</span>,
    BirthDate   <span class="sql-type">DATE</span>,
    IsActive    <span class="sql-type">BIT</span>           <span class="sql-kw">DEFAULT</span> 1,
    CreatedAt   <span class="sql-type">DATETIME</span>      <span class="sql-kw">DEFAULT</span> <span class="sql-fn">GETDATE</span>()
);</code></div>
         <p><code>IDENTITY(1,1)</code> means the ID starts at 1 and auto-increments by 1 for each new row.</p>`,

        // Page 3 — Constraints
        `<div class="page-chapter-label">Chapter 2 — Constraints</div>
         <h2>Column Constraints</h2>
         <hr class="page-divider">
         <p>Constraints enforce <strong>rules</strong> on the data to maintain integrity:</p>
         <table class="compare-table" data-table-id="ch2-constraints">
            <tr><th>Constraint</th><th>Meaning</th><th>Example</th></tr>
            <tr><td><code>PRIMARY KEY</code></td><td>Unique identifier for each row</td><td>StudentID</td></tr>
            <tr><td><code>NOT NULL</code></td><td>Column cannot be empty</td><td>FirstName</td></tr>
            <tr><td><code>UNIQUE</code></td><td>All values must be different</td><td>Email</td></tr>
            <tr><td><code>DEFAULT</code></td><td>Automatic value if none given</td><td>IsActive = 1</td></tr>
            <tr><td><code>CHECK</code></td><td>Value must satisfy a condition</td><td>Age > 0</td></tr>
            <tr><td><code>FOREIGN KEY</code></td><td>Links to another table's PK</td><td>DeptID → Departments</td></tr>
         </table>
         <div class="sql-block"><code><span class="sql-kw">CREATE TABLE</span> Employees (
    EmpID     <span class="sql-type">INT</span> <span class="sql-kw">PRIMARY KEY</span>,
    Name      <span class="sql-type">VARCHAR</span>(60) <span class="sql-kw">NOT NULL</span>,
    Salary    <span class="sql-type">DECIMAL</span>(10,2) <span class="sql-kw">CHECK</span> (Salary > 0),
    DeptID    <span class="sql-type">INT</span> <span class="sql-kw">REFERENCES</span> Departments(DeptID)
);</code></div>`,

        // Page 4 — ALTER & DROP
        `<div class="page-chapter-label">Chapter 2 — Modify & Delete</div>
         <h2>ALTER & DROP TABLE</h2>
         <hr class="page-divider">
         <h3><span class="h3-icon">+</span> Modifying a Table</h3>
         <p>Use <code>ALTER TABLE</code> to add, modify, or remove columns after creation:</p>
         <div class="sql-block"><code><span class="sql-comment">-- Add a new column</span>
<span class="sql-kw">ALTER TABLE</span> Students <span class="sql-kw">ADD</span> PhoneNumber <span class="sql-type">VARCHAR</span>(15);

<span class="sql-comment">-- Change column type</span>
<span class="sql-kw">ALTER TABLE</span> Students <span class="sql-kw">ALTER COLUMN</span> Email <span class="sql-type">VARCHAR</span>(150);

<span class="sql-comment">-- Remove a column</span>
<span class="sql-kw">ALTER TABLE</span> Students <span class="sql-kw">DROP COLUMN</span> PhoneNumber;</code></div>
         <h3><span class="h3-icon">x</span> Deleting a Table</h3>
         <div class="sql-block"><code><span class="sql-comment">-- Remove the entire table and all its data!</span>
<span class="sql-kw">DROP TABLE</span> Students;

<span class="sql-comment">-- Safe version: only drop if it exists</span>
<span class="sql-kw">DROP TABLE IF EXISTS</span> Students;</code></div>
         <p style="color:#a8346e;font-weight:600;">Warning: DROP TABLE is permanent — always double-check before running it!</p>`
    ],

    ch3: [
        // Page 1 — Title
        `<div class="page-chapter-label">Chapter 3</div>
         <h2>Keys & Relationships</h2>
         <hr class="page-divider">
         <p>Relational databases get their name from the <strong>relationships</strong> between tables. Keys are the mechanism that makes these relationships possible.</p>
         <p>Understanding the difference between <strong>Primary Keys</strong> and <strong>Foreign Keys</strong> is essential for proper database design.</p>
         <div class="diagram-box">
            <div class="diagram-title">How Tables Connect</div>
            <div class="rel-diagram">
                <div class="rel-table">
                    <div class="tbl-name">Students</div>
                    <div class="tbl-col"><span class="key-badge pk">PK</span> StudentID</div>
                    <div class="tbl-col">Name</div>
                    <div class="tbl-col">Email</div>
                </div>
                <div class="rel-arrow">→</div>
                <div class="rel-table">
                    <div class="tbl-name">Enrollments</div>
                    <div class="tbl-col"><span class="key-badge pk">PK</span> EnrollID</div>
                    <div class="tbl-col"><span class="key-badge fk">FK</span> StudentID</div>
                    <div class="tbl-col"><span class="key-badge fk">FK</span> CourseID</div>
                </div>
                <div class="rel-arrow">←</div>
                <div class="rel-table">
                    <div class="tbl-name">Courses</div>
                    <div class="tbl-col"><span class="key-badge pk">PK</span> CourseID</div>
                    <div class="tbl-col">CourseName</div>
                    <div class="tbl-col">Credits</div>
                </div>
            </div>
         </div>`,

        // Page 2 — Primary Key
        `<div class="page-chapter-label">Chapter 3 — Primary Key</div>
         <h2>Primary Key (PK)</h2>
         <hr class="page-divider">
         <p>A Primary Key is a column (or combination of columns) that <strong>uniquely identifies</strong> each row in a table. Every table should have one.</p>
         <h3><span class="h3-icon">PK</span> Rules of Primary Keys</h3>
         <div class="type-cards">
            <div class="type-card"><div class="type-card-name">Unique</div><div class="type-card-info">No two rows can share the same PK value</div><span class="type-card-tag numeric">Rule 1</span></div>
            <div class="type-card"><div class="type-card-name">Not Null</div><div class="type-card-info">A PK column can never be empty</div><span class="type-card-tag text">Rule 2</span></div>
            <div class="type-card"><div class="type-card-name">Immutable</div><div class="type-card-info">Once set, a PK value should not change</div><span class="type-card-tag other">Rule 3</span></div>
         </div>
         <div class="sql-block"><code><span class="sql-comment">-- Defining a primary key</span>
<span class="sql-kw">CREATE TABLE</span> Departments (
    DeptID    <span class="sql-type">INT</span>          <span class="sql-kw">PRIMARY KEY</span>,
    DeptName  <span class="sql-type">VARCHAR</span>(50)  <span class="sql-kw">NOT NULL</span>
);

<span class="sql-comment">-- Composite primary key (two columns together)</span>
<span class="sql-kw">CREATE TABLE</span> Enrollment (
    StudentID  <span class="sql-type">INT</span>,
    CourseID   <span class="sql-type">INT</span>,
    <span class="sql-kw">PRIMARY KEY</span> (StudentID, CourseID)
);</code></div>`,

        // Page 3 — Foreign Key
        `<div class="page-chapter-label">Chapter 3 — Foreign Key</div>
         <h2>Foreign Key (FK)</h2>
         <hr class="page-divider">
         <p>A Foreign Key is a column that <strong>references the Primary Key</strong> of another table. It creates a <strong>link</strong> between the two tables.</p>
         <div class="sql-block"><code><span class="sql-kw">CREATE TABLE</span> Students (
    StudentID  <span class="sql-type">INT</span> <span class="sql-kw">PRIMARY KEY</span>,
    Name       <span class="sql-type">VARCHAR</span>(50),
    DeptID     <span class="sql-type">INT</span>,
    <span class="sql-kw">FOREIGN KEY</span> (DeptID) <span class="sql-kw">REFERENCES</span> Departments(DeptID)
);</code></div>
         <h3><span class="h3-icon">FK</span> What Foreign Keys Enforce</h3>
         <table class="compare-table" data-table-id="ch3-fk-rules">
            <tr><th>Rule</th><th>Meaning</th></tr>
            <tr><td>Referential Integrity</td><td>You can't insert a DeptID that doesn't exist in the Departments table</td></tr>
            <tr><td>Cascade Delete</td><td>Optionally delete child rows when parent is deleted</td></tr>
            <tr><td>Cascade Update</td><td>Optionally update child FK when parent PK changes</td></tr>
         </table>
         <div class="sql-block"><code><span class="sql-comment">-- With cascade options</span>
<span class="sql-kw">FOREIGN KEY</span> (DeptID) <span class="sql-kw">REFERENCES</span> Departments(DeptID)
    <span class="sql-kw">ON DELETE CASCADE</span>
    <span class="sql-kw">ON UPDATE CASCADE</span>;</code></div>`,

        // Page 4 — Parent vs Child
        `<div class="page-chapter-label">Chapter 3 — Parent & Child</div>
         <h2>Parent vs Child Tables</h2>
         <hr class="page-divider">
         <p>When two tables are linked by a Foreign Key, one is the <strong>parent</strong> and the other is the <strong>child</strong>.</p>
         <table class="compare-table" data-table-id="ch3-parent-child">
            <tr><th>Aspect</th><th>Parent Table</th><th>Child Table</th></tr>
            <tr><td>Has the…</td><td>Primary Key (referenced)</td><td>Foreign Key (references PK)</td></tr>
            <tr><td>Created…</td><td>First (before child)</td><td>After parent exists</td></tr>
            <tr><td>Deleted…</td><td>After children, or with CASCADE</td><td>Freely (doesn't break refs)</td></tr>
            <tr><td>Example</td><td>Departments</td><td>Students (has DeptID FK)</td></tr>
         </table>
         <div class="diagram-box">
            <div class="diagram-title">Parent → Child Relationship</div>
            <div class="rel-diagram">
                <div class="rel-table" style="border-color:rgba(168,52,110,.4)">
                    <div class="tbl-name">Departments (Parent)</div>
                    <div class="tbl-col"><span class="key-badge pk">PK</span> DeptID</div>
                    <div class="tbl-col">DeptName</div>
                    <div class="tbl-col">Location</div>
                </div>
                <div class="rel-arrow" style="font-size:2rem">⟶</div>
                <div class="rel-table" style="border-color:rgba(99,102,241,.4)">
                    <div class="tbl-name">Students (Child)</div>
                    <div class="tbl-col"><span class="key-badge pk">PK</span> StudentID</div>
                    <div class="tbl-col">Name</div>
                    <div class="tbl-col"><span class="key-badge fk">FK</span> DeptID</div>
                </div>
            </div>
         </div>
         <p style="text-align:center;margin-top:12px;color:#a8346e;font-weight:600;">Remember: The table with the Foreign Key is always the <em>child!</em></p>`
    ],

    ch4: [
        // Page 1 — Title
        `<div class="page-chapter-label">Chapter 4</div>
         <h2>Schema Refinement &amp; Normalization</h2>
         <hr class="page-divider">
         <p>Database design is not just about creating tables; it is also about refining them to avoid <strong>redundancy</strong> and <strong>anomalies</strong>.</p>
         <p>Redundancy (storing the same data multiple times) causes several major problems in a database:</p>
         <div class="diagram-box">
            <div class="diagram-title">Anomalies Caused by Redundancy</div>
            <div class="type-cards">
                <div class="type-card">
                    <div class="type-card-name">Insert Anomaly</div>
                    <div class="type-card-info">Being unable to insert certain facts without introducing unrelated facts (e.g. unable to add a new course unless at least one student enrolls).</div>
                    <span class="type-card-tag text">Insert</span>
                </div>
                <div class="type-card">
                    <div class="type-card-name">Delete Anomaly</div>
                    <div class="type-card-info">Losing clean facts automatically when other unrelated facts are deleted (e.g. deleting a student enrollment inadvertently deletes the teacher's profile).</div>
                    <span class="type-card-tag other">Delete</span>
                </div>
                <div class="type-card">
                    <div class="type-card-name">Update Anomaly</div>
                    <div class="type-card-info">Changing a fact requires updating multiple rows (e.g. changing course name requires editing every single student's enrollment record).</div>
                    <span class="type-card-tag numeric">Update</span>
                </div>
            </div>
         </div>`,

        // Page 2 — FDs
        `<div class="page-chapter-label">Chapter 4 — Functional Dependencies</div>
         <h2>Functional Dependencies (FDs)</h2>
         <hr class="page-divider">
         <p>A <strong>Functional Dependency</strong> is an integrity constraint that generalizes keys. We write <code>X &rarr; Y</code>, which means "X uniquely determines Y" (if two rows have the same value for X, they must have the same value for Y).</p>
         <div class="sql-block"><code><span class="sql-comment">-- Example: StudentID determines Name, but NOT vice-versa</span>
StudentID &rarr; StudentName
CourseID  &rarr; CourseName, Credits</code></div>
         <h3><span class="h3-icon">K</span> Finding Candidate Keys</h3>
         <p>We use FDs to find the **Candidate Keys** of a table. A candidate key is a minimal set of columns that functionally determines all other columns in the table.</p>
         <p>To find keys, we compute the <strong>closure</strong> of a set of attributes (written as <code>X<sup>+</sup></code>), which is the set of all attributes determined by X under the given FDs.</p>`,

        // Page 3 — Normal Forms
        `<div class="page-chapter-label">Chapter 4 — Normal Forms</div>
         <h2>1NF, 2NF, and 3NF</h2>
         <hr class="page-divider">
         <p>Normalization organizes database columns to reduce redundancy. Normal Forms (NFs) define strict compliance states:</p>
         <table class="compare-table" data-table-id="ch4-normal-forms">
            <tr><th>Normal Form</th><th>Rule / Constraint</th><th>Goal</th></tr>
            <tr><td><strong>1NF</strong> (First)</td><td>All attributes must contain atomic (single) values. No lists or sets.</td><td>Eliminate repeating groups</td></tr>
            <tr><td><strong>2NF</strong> (Second)</td><td>Must be in 1NF, and no non-key attribute can depend on a <em>part</em> of a candidate key (no partial dependencies).</td><td>Eliminate partial key dependencies</td></tr>
            <tr><td><strong>3NF</strong> (Third)</td><td>Must be in 2NF, and all non-key attributes must depend <em>only</em> on the key (no transitive dependencies: X &rarr; Y &rarr; Z).</td><td>Eliminate transitive dependencies</td></tr>
         </table>
         <div class="sql-block"><code><span class="sql-comment">-- 3NF Rule for X &rarr; A:</span>
-- Either X &rarr; A is trivial (A &isin; X),
-- or X is a superkey,
-- or A is a prime attribute (part of some candidate key).</code></div>`,

        // Page 4 — BCNF
        `<div class="page-chapter-label">Chapter 4 — Boyce-Codd NF</div>
         <h2>Boyce-Codd Normal Form (BCNF)</h2>
         <hr class="page-divider">
         <p><strong>BCNF</strong> is a stronger version of 3NF. A table is in BCNF if and only if for every non-trivial functional dependency <code>X &rarr; A</code>, <strong>X is a superkey</strong>.</p>
         <p>In other words, BCNF ensures that the *only* non-trivial FDs that hold over a table are key constraints.</p>
         <div class="diagram-box">
            <div class="diagram-title">Normal Forms Hierarchy</div>
            <p style="font-family:'Fira Code',monospace; font-size:1.1rem; color:#a8346e; font-weight:700;">BCNF &sub; 3NF &sub; 2NF &sub; 1NF</p>
            <p style="font-size:0.75rem; margin-top:8px; color:#7a6580;">If a relation is in BCNF, it is guaranteed to be in 3NF, 2NF, and 1NF.</p>
         </div>
         <p>While 3NF decomposition is always dependency-preserving, BCNF decomposition is not always guaranteed to preserve functional dependencies.</p>`,

        // Page 5 — Decomposition
        `<div class="page-chapter-label">Chapter 4 — Refinement</div>
         <h2>Decomposition &amp; Synthesis</h2>
         <hr class="page-divider">
         <p>If a table violates a normal form, we refine it by **decomposing** it (splitting it into smaller tables). Any decomposition must satisfy two critical properties:</p>
         <div class="type-cards">
            <div class="type-card">
                <div class="type-card-name">Lossless Join</div>
                <div class="type-card-info">We must be able to reconstruct the original table exactly by joining the decomposed tables (no spurious tuples). <strong>Mandatory!</strong></div>
                <span class="type-card-tag text">Lossless</span>
            </div>
            <div class="type-card">
                <div class="type-card-name">Dependency Preserving</div>
                <div class="type-card-info">All functional dependencies can be checked by looking at individual tables (no need to perform joins to check constraints). <strong>Highly Desirable!</strong></div>
                <span class="type-card-tag other">Preservation</span>
            </div>
         </div>
         <p style="text-align:center;color:#a8346e;font-weight:600;font-size:0.8rem;">Tip: Use 3NF Synthesis (using a Minimal Cover) to guarantee both Lossless Join and Dependency Preservation!</p>`
    ],

    ch5: [
        // Page 1 — Title
        `<div class="page-chapter-label">Chapter 5</div>
         <h2>Relational Algebra</h2>
         <hr class="page-divider">
         <p><strong>Relational Algebra</strong> is a procedural query language that defines a set of operations on relations (tables). It provides the mathematical foundation for SQL query execution and optimization.</p>
         <p>Every operation in relational algebra takes one or more relations as input and returns a new relation as output. This property is called <strong>closure</strong>, which allows operations to be nested (composed).</p>
         <div class="diagram-box">
            <div class="diagram-title">Relational Algebra Operations</div>
            <div class="type-cards">
                <div class="type-card"><div class="type-card-name">Selection (&sigma;)</div><div class="type-card-info">Filter rows matching condition</div><span class="type-card-tag numeric">&sigma; Row filter</span></div>
                <div class="type-card"><div class="type-card-name">Projection (&pi;)</div><div class="type-card-info">Filter columns (removes duplicates)</div><span class="type-card-tag text">&pi; Column filter</span></div>
                <div class="type-card"><div class="type-card-name">Cross Product (X)</div><div class="type-card-info">Cartesian product of tuples</div><span class="type-card-tag other">X Combinations</span></div>
                <div class="type-card"><div class="type-card-name">Join (&bowtie;)</div><div class="type-card-info">Combine related tables</div><span class="type-card-tag numeric">&bowtie; Linking</span></div>
            </div>
         </div>`,

        // Page 2 — Select and Project
        `<div class="page-chapter-label">Chapter 5 — Selection &amp; Projection</div>
         <h2>Selection (&sigma;) &amp; Projection (&pi;)</h2>
         <hr class="page-divider">
         <h3><span class="h3-icon">&sigma;</span> Selection</h3>
         <p>Selects a subset of rows from a relation that satisfy a given selection condition.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Relational Algebra: &sigma; age > 21 (Students)</span>
<span class="sql-kw">SELECT DISTINCT</span> * <span class="sql-kw">FROM</span> Students <span class="sql-kw">WHERE</span> age > 21;</code></div>
         <h3><span class="h3-icon">&pi;</span> Projection</h3>
         <p>Keeps specified columns and deletes the rest. <strong>Note:</strong> Relational algebra operates on sets, so duplicate rows are automatically eliminated!</p>
         <div class="sql-block"><code><span class="sql-comment">-- Relational Algebra: &pi; name, email (Students)</span>
<span class="sql-kw">SELECT DISTINCT</span> name, email <span class="sql-kw">FROM</span> Students;</code></div>`,

        // Page 3 — Set Operations
        `<div class="page-chapter-label">Chapter 5 — Set Operations</div>
         <h2>Set Operations</h2>
         <hr class="page-divider">
         <p>Relations are sets of tuples, so we can apply standard set operations. To perform Union, Intersection, or Set-Difference, relations must be <strong>union-compatible</strong> (same number of columns, with matching data types).</p>
         <table class="compare-table" data-table-id="ch5-set-ops">
            <tr><th>Operation</th><th>Notation</th><th>SQL Equivalent</th><th>Description</th></tr>
            <tr><td><strong>Union</strong></td><td>R &cup; S</td><td>UNION</td><td>All tuples in R or S (no duplicates)</td></tr>
            <tr><td><strong>Intersection</strong></td><td>R &cap; S</td><td>INTERSECT</td><td>Tuples present in both R and S</td></tr>
            <tr><td><strong>Set-Difference</strong></td><td>R &minus; S</td><td>EXCEPT / MINUS</td><td>Tuples in R but not in S</td></tr>
            <tr><td><strong>Cross-Product</strong></td><td>R &times; S</td><td>CROSS JOIN</td><td>All combinations of tuples from R and S</td></tr>
         </table>`,

        // Page 4 — Joins
        `<div class="page-chapter-label">Chapter 5 — Joins</div>
         <h2>Joining Relations</h2>
         <hr class="page-divider">
         <p>Joins allow us to combine related information from different tables. They are shortcuts for combining a Cross-Product and a Selection.</p>
         <table class="compare-table" data-table-id="ch5-joins">
            <tr><th>Join Type</th><th>Notation</th><th>SQL Equivalent</th><th>Definition / Meaning</th></tr>
            <tr><td><strong>Theta-Join</strong></td><td>R &bowtie;<sub>c</sub> S</td><td>INNER JOIN ON c</td><td>Combined relations filtered by condition c: <code>&sigma;<sub>c</sub>(R &times; S)</code></td></tr>
            <tr><td><strong>Equi-Join</strong></td><td>R &bowtie;<sub>A=B</sub> S</td><td>INNER JOIN ON A=B</td><td>A Theta-Join where the join condition consists only of equalities</td></tr>
            <tr><td><strong>Natural Join</strong></td><td>R &bowtie; S</td><td>NATURAL JOIN</td><td>Equi-join on all columns with matching names, projecting out redundant columns</td></tr>
         </table>
         <div class="sql-block"><code><span class="sql-comment">-- Natural Join Example: Enrolled &bowtie; Students</span>
<span class="sql-kw">SELECT DISTINCT</span> Students.sid, Students.name, Enrolled.cid, Enrolled.grade
<span class="sql-kw">FROM</span> Students <span class="sql-kw">INNER JOIN</span> Enrolled <span class="sql-kw">ON</span> Students.sid = Enrolled.sid;</code></div>`,

        // Page 5 — Extended Algebra
        `<div class="page-chapter-label">Chapter 5 — Extended Operations</div>
         <h2>Extended Relational Algebra</h2>
         <hr class="page-divider">
         <p>Commercial database queries require capabilities beyond basic set algebra. Extended operations include:</p>
         <div class="type-cards">
            <div class="type-card">
                <div class="type-card-name">Aggregation (&vartheta; / &mathcal{G})</div>
                <div class="type-card-info">Applies functions like <code>SUM</code>, <code>AVG</code>, <code>COUNT</code>, <code>MIN</code>, <code>MAX</code>. Can also perform grouping (SQL <code>GROUP BY</code>).</div>
                <span class="type-card-tag numeric">&vartheta; Grouping</span>
            </div>
            <div class="type-card">
                <div class="type-card-name">Outer Join (&thinsp;&bowtie;&thinsp;)</div>
                <div class="type-card-info">Left, Right, or Full Outer Join. Prevents information loss by keeping unmatched tuples and padding missing columns with <code>NULL</code>.</div>
                <span class="type-card-tag text">&bowtie; Outer</span>
            </div>
            <div class="type-card">
                <div class="type-card-name">Division (/)</div>
                <div class="type-card-info">Finds values in one relation that are paired with <em>all</em> values of another relation (e.g. students enrolled in <em>all</em> courses).</div>
                <span class="type-card-tag other">/ Division</span>
            </div>
         </div>`
    ],

    ch6: [
        // Page 1 — Title
        `<div class="page-chapter-label">Chapter 6</div>
         <h2>Conceptual Design &amp; Class Mapping</h2>
         <hr class="page-divider">
         <p>In software development, we work with Object-Oriented classes. In databases, we work with Relational tables. <strong>Conceptual Database Design</strong> focuses on how to translate persistent classes and their relationships into relational schemas.</p>
         <p>A naive one-to-one mapping (creating one table for each class) has significant drawbacks:</p>
         <div class="diagram-box">
            <div class="diagram-title">Naive Mapping Drawbacks</div>
            <p style="font-size:0.8rem; line-height:1.6; text-align:left; color:#4a3558; margin-bottom:8px;">
               &bull; <strong>Too many tables:</strong> Creates redundant DBMS objects.<br>
               &bull; <strong>Too many joins:</strong> Degrades performance due to constant JOIN queries.<br>
               &bull; <strong>Missed tables:</strong> Many-to-many associations require a third relational table.<br>
               &bull; <strong>Inheritance issues:</strong> Relational databases do not support subclassing natively.
            </p>
         </div>
         <p><strong>Basic Mapping Rules:</strong> Table names should be plural variants of class names (e.g. <code>Students</code> for class <code>Student</code>), simple attributes map directly to table columns, and surrogate keys are added as primary keys.</p>`,

        // Page 2 — Simple Associations
        `<div class="page-chapter-label">Chapter 6 — Simple Associations</div>
         <h2>Mapping Multiplicities (1:1 &amp; 1:N)</h2>
         <hr class="page-divider">
         <p>Multiplicity defines how many instances of one class can be associated with an instance of another class:</p>
         <div class="type-cards">
            <div class="type-card">
                <div class="type-card-name">1 : 0..1 Multiplicity</div>
                <div class="type-card-info">Create a table for each class. The primary key of the "1" table becomes a <strong>Foreign Key</strong> in the related table (e.g. <code>Person &rarr; IdentityCard</code>).</div>
                <span class="type-card-tag text">1 : 0..1</span>
            </div>
            <div class="type-card">
                <div class="type-card-name">1 : 1 Multiplicity</div>
                <div class="type-card-info">Optimize by creating a <strong>single table</strong> containing attributes of both classes. This eliminates joins and improves performance.</div>
                <span class="type-card-tag other">1 : 1</span>
            </div>
            <div class="type-card">
                <div class="type-card-name">1 : N Multiplicity</div>
                <div class="type-card-info">Create a table for each class. The primary key of the "1" table becomes a <strong>Foreign Key</strong> in the "N" table (e.g. <code>Group &rarr; Student</code>, where Student table has GroupID).</div>
                <span class="type-card-tag numeric">1 : N</span>
            </div>
         </div>`,

        // Page 3 — M:N Associations
        `<div class="page-chapter-label">Chapter 6 — M:N Associations</div>
         <h2>Mapping Many-to-Many</h2>
         <hr class="page-divider">
         <p>Many-to-many (<code>M : N</code>) relationships cannot be modeled directly with a foreign key in either table. It requires an intermediate junction table.</p>
         <table class="compare-table" data-table-id="ch6-association-mapping">
            <tr><th>Multiplicity</th><th>Implementation Strategy</th><th>Primary Key Choice</th></tr>
            <tr><td><strong>1 : 0..1</strong> or <strong>1 : N</strong></td><td>Foreign Key in child/dependent table.</td><td>Separate primary key in each table.</td></tr>
            <tr><td><strong>M : N</strong> (Many-to-Many)</td><td>Create an additional <strong>intersection/junction table</strong>.</td><td>Composite primary key made of both foreign keys.</td></tr>
            <tr><td><strong>Association Class</strong></td><td>Intersection table includes columns for all attributes of the association class.</td><td>Composite of the two foreign keys, or a new surrogate key.</td></tr>
         </table>
         <div class="sql-block"><code><span class="sql-comment">-- Example: Authors (PersonID, BookID) cross table</span>
<span class="sql-kw">CREATE TABLE</span> Authors (
    PersonID  <span class="sql-type">INT</span> <span class="sql-kw">REFERENCES</span> Persons(ID),
    BookID    <span class="sql-type">INT</span> <span class="sql-kw">REFERENCES</span> Books(ID),
    <span class="sql-kw">PRIMARY KEY</span> (PersonID, BookID)
);</code></div>`,

        // Page 4 — Inheritance
        `<div class="page-chapter-label">Chapter 6 — Inheritance</div>
         <h2>Mapping Inheritance</h2>
         <hr class="page-divider">
         <p>There are three standard alternatives to map inheritance hierarchy (e.g. <code>Student</code> and <code>Teacher</code> inheriting from <code>Person</code>):</p>
         <div class="type-cards">
            <div class="type-card">
                <div class="type-card-name">Alt 1: Table per Class</div>
                <div class="type-card-info">Create a table for each class (Persons, Students, Teachers) linked by primary keys, and define SQL VIEWS to reconstruct full objects. High flexibility, lower join performance.</div>
                <span class="type-card-tag text">Joined</span>
            </div>
            <div class="type-card">
                <div class="type-card-name">Alt 2: Single Table</div>
                <div class="type-card-info">De-normalize all attributes from all subclasses into one single table (Persons). Subclass columns must allow <code>NULL</code> values. Best performance, wastes space (dead space).</div>
                <span class="type-card-tag other">Single Table</span>
            </div>
            <div class="type-card">
                <div class="type-card-name">Alt 3: Concrete Class</div>
                <div class="type-card-info">Create separate tables for concrete subclasses (Students, Teachers) containing all superclass fields. No Persons table. Good performance, schema changes are difficult.</div>
                <span class="type-card-tag numeric">Concrete</span>
            </div>
         </div>`,

        // Page 5 — Special Mappings
        `<div class="page-chapter-label">Chapter 6 — Special Mappings</div>
         <h2>Composition &amp; Recursive Mapping</h2>
         <hr class="page-divider">
         <h3><span class="h3-icon">&bull;</span> Composition &amp; Aggregation</h3>
         <p>Composition (strong whole-part relationship where parts cannot exist without the whole) requires enforcing **ON DELETE CASCADE** in the parts table so that deleting the whole deletes all constituent parts.</p>
         <h3><span class="h3-icon">&bull;</span> Reflexive Associations</h3>
         <p>A reflexive association (recursive relationship where a class relates to itself, like a <code>Node</code> pointing to a parent <code>Node</code>) is mapped by adding a foreign key that references the primary key of the same table.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Reflexive relationship example</span>
<span class="sql-kw">CREATE TABLE</span> Nodes (
    NodeID    <span class="sql-type">INT</span> <span class="sql-kw">PRIMARY KEY</span>,
    Info      <span class="sql-type">VARCHAR</span>(100),
    ParentID  <span class="sql-type">INT</span> <span class="sql-kw">REFERENCES</span> Nodes(NodeID) <span class="sql-comment">-- Self-reference</span>
);</code></div>`
    ],

    ch7: [
        // Page 1 — Intro to Joins
        `<div class="page-chapter-label">Chapter 7</div>
         <h2>SQL Joins in Detail</h2>
         <hr class="page-divider">
         <p>In relational databases, data is split across multiple tables to avoid redundancy (normalization). **Joins** allow us to reconstruct complete records by linking rows that share matching values.</p>
         <div class="diagram-box">
            <div class="diagram-title">Visualizing Join Logic</div>
            <p style="font-size:0.8rem; line-height:1.6; text-align:left; color:#4a3558; margin-bottom:8px;">
               &bull; <strong>Normal form normalization</strong> separates Student details from Class details.<br>
               &bull; <strong>Matching keys</strong> (e.g. Student's <code>ClassID</code> linking to Class's <code>ClassID</code>) link them.<br>
               &bull; <strong>The JOIN query</strong> runs on the database server to combine columns matching our criteria.
            </p>
         </div>
         <p>There are several types of SQL joins, each determining how unmatched rows are handled. In this chapter, we will explore: <code>INNER JOIN</code>, <code>LEFT JOIN</code>, <code>RIGHT JOIN</code>, <code>FULL JOIN</code>, <code>CROSS JOIN</code>, and <code>SELF JOIN</code>.</p>`,

        // Page 2 — INNER JOIN
        `<div class="page-chapter-label">Chapter 7 — INNER JOIN</div>
         <h2>INNER JOIN (Matches Only)</h2>
         <hr class="page-divider">
         <p>The **INNER JOIN** is the most common join type. It returns rows only when there is a match in **both** tables. If a row in the left table doesn't have a matching key in the right table, it is excluded from the result set.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Select matching rows only</span>
<span class="sql-kw">SELECT</span> Students.Name, Groups.GroupName
<span class="sql-kw">FROM</span> Students
<span class="sql-kw">INNER JOIN</span> Groups <span class="sql-kw">ON</span> Students.GroupID = Groups.GroupID;</code></div>
         <p>If a student has a <code>NULL</code> GroupID, or a group has no students enrolled, they will **not** appear in the output. This represents the intersection of the two sets.</p>`,

        // Page 3 — LEFT JOIN
        `<div class="page-chapter-label">Chapter 7 — LEFT JOIN</div>
         <h2>LEFT OUTER JOIN</h2>
         <hr class="page-divider">
         <p>A **LEFT OUTER JOIN** (or simply LEFT JOIN) returns **all** rows from the left table, and the matched rows from the right table. If there is no match, the columns from the right table will contain <strong>NULL</strong>.</p>
         <table class="compare-table" data-table-id="ch7-left-join">
            <tr><th>StudentID</th><th>Student Name</th><th>GroupID</th><th>GroupName</th></tr>
            <tr><td>1</td><td>Alice</td><td>101</td><td>Group A</td></tr>
            <tr><td>2</td><td>Bob</td><td>102</td><td>Group B</td></tr>
            <tr><td>3</td><td>Charlie</td><td>NULL</td><td><strong>NULL</strong></td></tr>
         </table>
         <div class="sql-block"><code><span class="sql-comment">-- Charlie has no group, but is still listed</span>
<span class="sql-kw">SELECT</span> Students.Name, Groups.GroupName
<span class="sql-kw">FROM</span> Students
<span class="sql-kw">LEFT JOIN</span> Groups <span class="sql-kw">ON</span> Students.GroupID = Groups.GroupID;</code></div>`,

        // Page 4 — RIGHT JOIN
        `<div class="page-chapter-label">Chapter 7 — RIGHT JOIN</div>
         <h2>RIGHT OUTER JOIN</h2>
         <hr class="page-divider">
         <p>A **RIGHT OUTER JOIN** is the inverse of a LEFT JOIN. It returns **all** rows from the right table, and matched rows from the left table. Unmatched left-side rows are padded with <strong>NULL</strong>.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Returns all groups, even those with no students</span>
<span class="sql-kw">SELECT</span> Students.Name, Groups.GroupName
<span class="sql-kw">FROM</span> Students
<span class="sql-kw">RIGHT JOIN</span> Groups <span class="sql-kw">ON</span> Students.GroupID = Groups.GroupID;</code></div>
         <p>Right Joins are less common in practice because queries can usually be rewritten as Left Joins simply by swapping the table order in the <code>FROM</code> clause (which improves readability).</p>`,

        // Page 5 — FULL JOIN
        `<div class="page-chapter-label">Chapter 7 — FULL JOIN</div>
         <h2>FULL OUTER JOIN</h2>
         <hr class="page-divider">
         <p>A **FULL OUTER JOIN** returns all rows when there is a match in either the left or right table. It combines the behaviors of both LEFT JOIN and RIGHT JOIN.</p>
         <p>Any row that has no match on the opposing side is padded with <code>NULL</code> values in the empty fields.</p>
         <div class="sql-block"><code><span class="sql-comment">-- All students and all groups are returned</span>
<span class="sql-kw">SELECT</span> Students.Name, Groups.GroupName
<span class="sql-kw">FROM</span> Students
<span class="sql-kw">FULL JOIN</span> Groups <span class="sql-kw">ON</span> Students.GroupID = Groups.GroupID;</code></div>
         <p>Full Joins are useful for auditing data or finding orphaned rows in both tables simultaneously.</p>`,

        // Page 6 — CROSS JOIN
        `<div class="page-chapter-label">Chapter 7 — CROSS JOIN</div>
         <h2>CROSS JOIN (Cartesian Product)</h2>
         <hr class="page-divider">
         <p>A **CROSS JOIN** returns the Cartesian product of the two tables. Every row from the first table is joined with every row from the second table.</p>
         <p>No <code>ON</code> clause is used because no keys are matched. If Table A has <code>M</code> rows and Table B has <code>N</code> rows, the output will have <code>M &times; N</code> rows.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Generate every combination of student and group</span>
<span class="sql-kw">SELECT</span> Students.Name, Groups.GroupName
<span class="sql-kw">FROM</span> Students
<span class="sql-kw">CROSS JOIN</span> Groups;</code></div>`,

        // Page 7 — SELF JOIN
        `<div class="page-chapter-label">Chapter 7 — SELF JOIN</div>
         <h2>SELF JOIN</h2>
         <hr class="page-divider">
         <p>A **SELF JOIN** is a regular join, but the table is joined with itself. This is useful for querying hierarchical data stored in a single table, such as employees and their managers.</p>
         <p>Since the table is repeated, you **must use aliases** to distinguish between the two instances of the table.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Join Employees table to itself</span>
<span class="sql-kw">SELECT</span> E.Name <span class="sql-kw">AS</span> Employee, M.Name <span class="sql-kw">AS</span> Manager
<span class="sql-kw">FROM</span> Employees E
<span class="sql-kw">INNER JOIN</span> Employees M <span class="sql-kw">ON</span> E.ManagerID = M.EmployeeID;</code></div>`
    ],

    ch8: [
        // Page 1 — Intro to Aggregation
        `<div class="page-chapter-label">Chapter 8</div>
         <h2>SQL Grouping &amp; Aggregations</h2>
         <hr class="page-divider">
         <p>Database queries often need to summarize large sets of rows rather than listing them individually. SQL provides **Aggregate Functions** to perform mathematical summaries on columns.</p>
         <p>The five standard aggregate functions supported by almost all SQL databases are:</p>
         <div class="type-cards">
            <div class="type-card"><div class="type-card-name">COUNT()</div><div class="type-card-info">Counts the number of rows or values.</div><span class="type-card-tag numeric">Count</span></div>
            <div class="type-card"><div class="type-card-name">SUM()</div><div class="type-card-info">Adds up numeric values.</div><span class="type-card-tag text">Math</span></div>
            <div class="type-card"><div class="type-card-name">AVG()</div><div class="type-card-info">Calculates the mean average of values.</div><span class="type-card-tag other">Mean</span></div>
            <div class="type-card"><div class="type-card-name">MIN() / MAX()</div><div class="type-card-info">Finds lowest or highest values.</div><span class="type-card-tag numeric">Extreme</span></div>
         </div>`,

        // Page 2 — COUNT & SUM
        `<div class="page-chapter-label">Chapter 8 — COUNT &amp; SUM</div>
         <h2>COUNT &amp; SUM Functions</h2>
         <hr class="page-divider">
         <h3>COUNT()</h3>
         <p>Counts matching rows. <code>COUNT(*)</code> counts all rows, while <code>COUNT(column)</code> counts only rows where the column is **not NULL**.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Count total students, and unique group IDs</span>
<span class="sql-kw">SELECT</span> COUNT(*), COUNT(DISTINCT GroupID) <span class="sql-kw">FROM</span> Students;</code></div>
         <h3>SUM()</h3>
         <p>Adds all values in a numeric column. Null values are ignored.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Total cost of all products</span>
<span class="sql-kw">SELECT</span> SUM(Price) <span class="sql-kw">FROM</span> Products;</code></div>`,

        // Page 3 — AVG, MIN, MAX
        `<div class="page-chapter-label">Chapter 8 — Averages &amp; Extremes</div>
         <h2>AVG, MIN, and MAX</h2>
         <hr class="page-divider">
         <h3>AVG()</h3>
         <p>Calculates the average of a numeric column. Ignores NULL values completely (it does not count them as 0).</p>
         <div class="sql-block"><code><span class="sql-comment">-- Average price of products</span>
<span class="sql-kw">SELECT</span> AVG(Price) <span class="sql-kw">FROM</span> Products;</code></div>
         <h3>MIN() &amp; MAX()</h3>
         <p>Finds the smallest and largest values. These functions work on numbers, dates, and even alphabetical text.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Cheapest and most expensive products</span>
<span class="sql-kw">SELECT</span> MIN(Price), MAX(Price) <span class="sql-kw">FROM</span> Products;</code></div>`,

        // Page 4 — GROUP BY
        `<div class="page-chapter-label">Chapter 8 — GROUP BY</div>
         <h2>The GROUP BY Clause</h2>
         <hr class="page-divider">
         <p>The **GROUP BY** clause groups rows that have the same values into summary rows. It is used in conjunction with aggregate functions to compute summaries for each group.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Find average salary for each department</span>
<span class="sql-kw">SELECT</span> DepartmentID, AVG(Salary)
<span class="sql-kw">FROM</span> Employees
<span class="sql-kw">GROUP BY</span> DepartmentID;</code></div>
         <p><strong>Golden Rule:</strong> Any column in your <code>SELECT</code> clause that is **not** inside an aggregate function **must** be listed in the <code>GROUP BY</code> clause!</p>`,

        // Page 5 — HAVING
        `<div class="page-chapter-label">Chapter 8 — HAVING</div>
         <h2>HAVING vs WHERE</h2>
         <hr class="page-divider">
         <p>The <strong>HAVING</strong> clause filters groups, while the <strong>WHERE</strong> clause filters individual rows. Because WHERE executes before grouping, it cannot be used with aggregate functions.</p>
         <table class="compare-table" data-table-id="ch8-having-vs-where">
            <tr><th>Clause</th><th>Executed…</th><th>Can Use Aggregates?</th><th>Purpose</th></tr>
            <tr><td><strong>WHERE</strong></td><td>Before grouping (GROUP BY)</td><td>No</td><td>Filters raw input rows</td></tr>
            <tr><td><strong>HAVING</strong></td><td>After grouping (GROUP BY)</td><td>Yes</td><td>Filters aggregated groups</td></tr>
         </table>
         <div class="sql-block"><code><span class="sql-comment">-- Find departments with average salary over 50,000</span>
<span class="sql-kw">SELECT</span> DeptID, AVG(Salary) <span class="sql-kw">FROM</span> Employees
<span class="sql-kw">GROUP BY</span> DeptID <span class="sql-kw">HAVING</span> AVG(Salary) > 50000;</code></div>`,

        // Page 6 — Multiple Groupings
        `<div class="page-chapter-label">Chapter 8 — Multiple Groupings</div>
         <h2>Grouping by Multiple Columns</h2>
         <hr class="page-divider">
         <p>You can group rows by more than one column. This creates a nested sub-grouping hierarchy (e.g. counting employees per department **and** per job title).</p>
         <div class="sql-block"><code><span class="sql-comment">-- Department-Job hierarchy count</span>
<span class="sql-kw">SELECT</span> DeptID, JobTitle, COUNT(*)
<span class="sql-kw">FROM</span> Employees
<span class="sql-kw">GROUP BY</span> DeptID, JobTitle;</code></div>
         <p>The database will create a unique summary row for every distinct combination of <code>DeptID</code> and <code>JobTitle</code>.</p>`,

        // Page 7 — Advanced Aggregations
        `<div class="page-chapter-label">Chapter 8 — Advanced summaries</div>
         <h2>Conditional Aggregations</h2>
         <hr class="page-divider">
         <p>Sometimes you need to aggregate values based on conditions. You can achieve this by nesting **CASE WHEN** expressions inside aggregate functions.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Count active vs inactive students in one scan</span>
<span class="sql-kw">SELECT</span>
    COUNT(CASE WHEN IsActive = 1 THEN 1 END) AS ActiveCount,
    COUNT(CASE WHEN IsActive = 0 THEN 1 END) AS InactiveCount
FROM Students;</code></div>
         <p>This is highly optimized because the database evaluates conditions row-by-row and runs summaries in a single pass over the table.</p>`
    ],

    ch9: [
        // Page 1 — Intro to Nested Queries
        `<div class="page-chapter-label">Chapter 9</div>
         <h2>SQL Subqueries &amp; CTEs</h2>
         <hr class="page-divider">
         <p>A **Subquery** (or nested query) is an SQL query nested inside another query. The results of the inner query are evaluated and used by the outer query to compute its final results.</p>
         <div class="diagram-box">
            <div class="diagram-title">Subquery Execution Flow</div>
            <p style="font-family:'Fira Code',monospace; font-size:0.8rem; color:#a8346e; font-weight:700;">
               Inner Query (computes average) &rarr; Average Value &rarr; Outer Query (filters rows above average)
            </p>
         </div>
         <p>Subqueries can return single values (scalar), single columns (lists), or whole tables. In this chapter, we will learn how to write subqueries in the <code>WHERE</code>, <code>FROM</code>, and <code>SELECT</code> clauses, use CTEs, and write correlated queries.</p>`,

        // Page 2 — Subqueries in WHERE
        `<div class="page-chapter-label">Chapter 9 — WHERE Subqueries</div>
         <h2>Subqueries in the WHERE Clause</h2>
         <hr class="page-divider">
         <p>Subqueries in the <code>WHERE</code> clause are commonly used to filter records against dynamic criteria computed on the fly.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Find employees earning more than the company average</span>
<span class="sql-kw">SELECT</span> Name, Salary <span class="sql-kw">FROM</span> Employees
<span class="sql-kw">WHERE</span> Salary > (
    <span class="sql-kw">SELECT</span> AVG(Salary) <span class="sql-kw">FROM</span> Employees
);</code></div>
         <p>If the subquery returns multiple values, you must use operators like **IN**, **ANY**, or **ALL** instead of standard comparisons (<code>=</code>, <code>&gt;</code>).</p>`,

        // Page 3 — Correlated Subqueries
        `<div class="page-chapter-label">Chapter 9 — Correlated</div>
         <h2>Correlated Subqueries</h2>
         <hr class="page-divider">
         <p>A **Correlated Subquery** is an inner query that references columns from the outer query. Unlike a standard subquery, it is executed repeatedly—once for each row candidate in the outer query.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Employees earning more than their department's average</span>
<span class="sql-kw">SELECT</span> E.Name, E.Salary, E.DeptID
<span class="sql-kw">FROM</span> Employees E
<span class="sql-kw">WHERE</span> E.Salary > (
    <span class="sql-kw">SELECT</span> AVG(Salary) <span class="sql-kw">FROM</span> Employees
    <span class="sql-kw">WHERE</span> DeptID = E.DeptID <span class="sql-comment">-- Reference to outer E</span>
);</code></div>
         <p>Correlated subqueries can be slow on very large tables, so rewrite them as joins where possible.</p>`,

        // Page 4 — EXISTS & NOT EXISTS
        `<div class="page-chapter-label">Chapter 9 — EXISTS</div>
         <h2>EXISTS &amp; NOT EXISTS</h2>
         <hr class="page-divider">
         <p>The **EXISTS** operator is used to test for the existence of any record in a subquery. It returns TRUE if the subquery returns one or more rows.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Find students who have made at least one lab submission</span>
<span class="sql-kw">SELECT</span> S.Name <span class="sql-kw">FROM</span> Students S
<span class="sql-kw">WHERE EXISTS</span> (
    <span class="sql-kw">SELECT</span> 1 <span class="sql-kw">FROM</span> Submissions SUB
    <span class="sql-kw">WHERE</span> SUB.StudentID = S.StudentID
);</code></div>
         <p><strong>Performance Tip:</strong> <code>EXISTS</code> halts evaluation immediately when the first match is found, making it faster than aggregate counts or large <code>IN</code> subqueries.</p>`,

        // Page 5 — Subqueries in FROM & SELECT
        `<div class="page-chapter-label">Chapter 9 — SELECT &amp; FROM</div>
         <h2>Subqueries in SELECT &amp; FROM</h2>
         <hr class="page-divider">
         <h3>Subqueries in FROM (Derived Tables)</h3>
         <p>You can use a subquery as a temporary table in your FROM clause. You **must** give it a table alias.</p>
         <div class="sql-block"><code><span class="sql-kw">SELECT</span> Temp.DeptID, Temp.MaxSal
<span class="sql-kw">FROM</span> (
    <span class="sql-kw">SELECT</span> DeptID, MAX(Salary) <span class="sql-kw">AS</span> MaxSal <span class="sql-kw">FROM</span> Employees <span class="sql-kw">GROUP BY</span> DeptID
) <span class="sql-kw">AS</span> Temp;</code></div>
         <h3>Subqueries in SELECT</h3>
         <p>Returns a scalar value to project alongside columns in the select list.</p>
         <div class="sql-block"><code><span class="sql-kw">SELECT</span> Name, (SELECT COUNT(*) FROM Tasks WHERE WorkerID = E.ID) <span class="sql-kw">FROM</span> Employees E;</code></div>`,

        // Page 6 — CTEs
        `<div class="page-chapter-label">Chapter 9 — CTEs</div>
         <h2>Common Table Expressions (CTEs)</h2>
         <hr class="page-divider">
         <p>A **Common Table Expression (CTE)** is a temporary result set defined using the <strong>WITH</strong> clause. CTEs make complex queries much cleaner, readable, and easier to maintain than nested subqueries.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Defining a CTE named DeptSalaries</span>
<span class="sql-kw">WITH</span> DeptSalaries <span class="sql-kw">AS</span> (
    <span class="sql-kw">SELECT</span> DeptID, AVG(Salary) <span class="sql-kw">AS</span> AvgSalary
    <span class="sql-kw">FROM</span> Employees
    <span class="sql-kw">GROUP BY</span> DeptID
)
<span class="sql-kw">SELECT</span> E.Name, E.Salary, D.AvgSalary
<span class="sql-kw">FROM</span> Employees E
<span class="sql-kw">INNER JOIN</span> DeptSalaries D <span class="sql-kw">ON</span> E.DeptID = D.DeptID;</code></div>`,

        // Page 7 — Recursive CTEs
        `<div class="page-chapter-label">Chapter 9 — Recursive CTEs</div>
         <h2>Recursive CTEs &amp; Hierarchy</h2>
         <hr class="page-divider">
         <p>A **Recursive CTE** references itself. It is composed of two parts: an **anchor member** (initial row) and a **recursive member** (joins back to the CTE to retrieve sub-elements) combined with <code>UNION ALL</code>.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Traverse an organizational tree</span>
<span class="sql-kw">WITH RECURSIVE</span> OrgChart <span class="sql-kw">AS</span> (
    <span class="sql-comment">-- Anchor: Top manager</span>
    <span class="sql-kw">SELECT</span> EmployeeID, Name, ManagerID, 1 <span class="sql-kw">AS</span> Level
    <span class="sql-kw">FROM</span> Employees <span class="sql-kw">WHERE</span> ManagerID <span class="sql-kw">IS NULL</span>
    <span class="sql-kw">UNION ALL</span>
    <span class="sql-comment">-- Recursive: Children rows</span>
    <span class="sql-kw">SELECT</span> E.EmployeeID, E.Name, E.ManagerID, O.Level + 1
    <span class="sql-kw">FROM</span> Employees E
    <span class="sql-kw">INNER JOIN</span> OrgChart O <span class="sql-kw">ON</span> E.ManagerID = O.EmployeeID
)
)
<span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> OrgChart;</code></div>`
    ],

    ch10: [
        // Page 1 — Intro to SQL Functions
        `<div class="page-chapter-label">Chapter 10</div>
         <h2>Built-in SQL Functions</h2>
         <hr class="page-divider">
         <p>SQL databases provide a rich set of built-in **Scalar Functions** to manipulate data values. Unlike aggregate functions, scalar functions operate on a single input value and return a single output value for each row.</p>
         <div class="diagram-box">
            <div class="diagram-title">Built-in Function Categories</div>
            <p style="font-size:0.8rem; line-height:1.6; text-align:left; color:#4a3558; margin-bottom:8px;">
               &bull; <strong>String Functions:</strong> For parsing, joining, and transforming text.<br>
               &bull; <strong>Numeric Functions:</strong> For rounding and running mathematical operations.<br>
               &bull; <strong>Date &amp; Time Functions:</strong> For date arithmetic and time calculations.<br>
               &bull; <strong>Conditional Functions:</strong> For logical flow control and handling nulls.
            </p>
         </div>
         <p>In this chapter, we will learn the most essential SQL functions that every database developer and analyst uses daily.</p>`,

        // Page 2 — String Functions 1
        `<div class="page-chapter-label">Chapter 10 — String Functions 1</div>
         <h2>String Manipulation (Part 1)</h2>
         <hr class="page-divider">
         <h3>CONCAT()</h3>
         <p>Combines two or more text strings. In PostgreSQL, you can also use the <code>||</code> operator.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Merge first name and last name</span>
<span class="sql-kw">SELECT</span> CONCAT(FirstName, ' ', LastName) <span class="sql-kw">AS</span> FullName <span class="sql-kw">FROM</span> Users;</code></div>
         <h3>LOWER() &amp; UPPER()</h3>
         <p>Converts all letters in a string to lowercase or uppercase.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Standardize emails to lowercase</span>
<span class="sql-kw">SELECT</span> LOWER(Email) <span class="sql-kw">FROM</span> Users;</code></div>
         <h3>LENGTH()</h3>
         <p>Returns the number of characters in a string. (In SQL Server, this is <code>LEN()</code>).</p>
         <div class="sql-block"><code><span class="sql-comment">-- Find users with short passwords</span>
<span class="sql-kw">SELECT</span> Name <span class="sql-kw">FROM</span> Users <span class="sql-kw">WHERE</span> LENGTH(Password) &lt; 8;</code></div>`,

        // Page 3 — String Functions 2
        `<div class="page-chapter-label">Chapter 10 — String Functions 2</div>
         <h2>String Manipulation (Part 2)</h2>
         <hr class="page-divider">
         <h3>SUBSTRING()</h3>
         <p>Extracts a portion of a string. Syntax: <code>SUBSTRING(string, start_index, length)</code>. Indices are 1-based.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Extract first 3 letters of name</span>
<span class="sql-kw">SELECT</span> SUBSTRING(Name, 1, 3) <span class="sql-kw">FROM</span> Users;</code></div>
         <h3>TRIM()</h3>
         <p>Removes leading and trailing spaces. You can also use <code>LTRIM()</code> or <code>RTRIM()</code> for single-sided trims.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Clean up user input whitespace</span>
<span class="sql-kw">SELECT</span> TRIM(Username) <span class="sql-kw">FROM</span> Users;</code></div>
         <h3>REPLACE()</h3>
         <p>Replaces all occurrences of a substring within a string with a new substring.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Replace old domain name with new one</span>
<span class="sql-kw">SELECT</span> REPLACE(Email, '@old.com', '@new.com') <span class="sql-kw">FROM</span> Users;</code></div>`,

        // Page 4 — Math Functions
        `<div class="page-chapter-label">Chapter 10 — Math Functions</div>
         <h2>Numeric &amp; Math Functions</h2>
         <hr class="page-divider">
         <h3>ROUND()</h3>
         <p>Rounds a numeric value to a specified number of decimal places.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Round average score to 2 decimal places</span>
<span class="sql-kw">SELECT</span> ROUND(AVG(Score), 2) <span class="sql-kw">FROM</span> Submissions;</code></div>
         <h3>ABS()</h3>
         <p>Returns the absolute (positive) value of a number.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Find deviation from target</span>
<span class="sql-kw">SELECT</span> ABS(Score - 100) <span class="sql-kw">FROM</span> Submissions;</code></div>
         <h3>CEILING() &amp; FLOOR()</h3>
         <p><code>CEILING()</code> rounds a number UP to the nearest integer. <code>FLOOR()</code> rounds a number DOWN to the nearest integer.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Floor division helper</span>
<span class="sql-kw">SELECT</span> FLOOR(Points / 10) <span class="sql-kw">FROM</span> Questions;</code></div>`,

        // Page 5 — Date Functions 1
        `<div class="page-chapter-label">Chapter 10 — Date Functions 1</div>
         <h2>Date &amp; Time (Part 1)</h2>
         <hr class="page-divider">
         <h3>Getting Current Time</h3>
         <p>To get the current timestamp, database engines use standard keyword functions like <code>NOW()</code>, <code>CURRENT_TIMESTAMP</code>, or <code>GETDATE()</code>.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Insert current time into logs</span>
<span class="sql-kw">INSERT INTO</span> Logs (ActionTime) <span class="sql-kw">VALUES</span> (NOW());</code></div>
         <h3>Extracting Parts</h3>
         <p>You can extract the year, month, or day from a date using functions like <code>YEAR()</code>, <code>MONTH()</code>, <code>DAY()</code> (or <code>EXTRACT()</code> in PostgreSQL).</p>
         <div class="sql-block"><code><span class="sql-comment">-- Group orders by year</span>
<span class="sql-kw">SELECT</span> YEAR(OrderDate), COUNT(*) <span class="sql-kw">FROM</span> Orders <span class="sql-kw">GROUP BY</span> YEAR(OrderDate);</code></div>`,

        // Page 6 — Date Functions 2
        `<div class="page-chapter-label">Chapter 10 — Date Functions 2</div>
         <h2>Date Arithmetic (Part 2)</h2>
         <hr class="page-divider">
         <h3>DATEADD() / INTERVAL</h3>
         <p>Adds or subtracts a time interval to a date (e.g. adding 30 days to check a deadline expiration).</p>
         <div class="sql-block"><code><span class="sql-comment">-- PostgreSQL: Add 30 days interval</span>
OrderDate + <span class="sql-type">INTERVAL</span> '30 days'
<span class="sql-comment">-- SQL Server: DATEADD(day, 30, OrderDate)</span></code></div>
         <h3>DATEDIFF()</h3>
         <p>Returns the difference between two dates in days, months, or years.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Find age of a student in years</span>
<span class="sql-kw">SELECT</span> DATEDIFF(YEAR, BirthDate, NOW()) <span class="sql-kw">FROM</span> Students;</code></div>`,

        // Page 7 — Conditional Functions
        `<div class="page-chapter-label">Chapter 10 — Conditional Functions</div>
         <h2>Logical Control &amp; Handling Nulls</h2>
         <hr class="page-divider">
         <h3>COALESCE()</h3>
         <p>Returns the **first non-null value** in a list. This is highly useful for providing default fallback values for null columns.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Display 'No Group' if GroupID is NULL</span>
<span class="sql-kw">SELECT</span> Name, COALESCE(GroupName, 'No Group') <span class="sql-kw">FROM</span> Students;</code></div>
         <h3>CASE WHEN</h3>
         <p>The standard SQL conditional control statement. Evaluates conditions and returns a value.</p>
         <div class="sql-block"><code><span class="sql-kw">SELECT</span> Name, Score,
    <span class="sql-kw">CASE WHEN</span> Score >= 50 <span class="sql-kw">THEN</span> 'Pass'
         <span class="sql-kw">ELSE</span> 'Fail' <span class="sql-kw">END</span> <span class="sql-kw">AS</span> Status
<span class="sql-kw">FROM</span> Submissions;</code></div>`
    ],

    ch11: [
        // Page 1 — Intro to Set Operations
        `<div class="page-chapter-label">Chapter 11</div>
         <h2>Set Operations &amp; Window Functions</h2>
         <hr class="page-divider">
         <p>This chapter covers two advanced SQL topics: **Set Operations** (combining result sets horizontally) and **Window Functions** (calculating running analytics without collapsing rows).</p>
         <div class="diagram-box">
            <div class="diagram-title">Syllabus Overview</div>
            <p style="font-size:0.8rem; line-height:1.6; text-align:left; color:#4a3558; margin-bottom:8px;">
               &bull; <strong>Set Operators:</strong> <code>UNION</code>, <code>INTERSECT</code>, and <code>EXCEPT</code>.<br>
               &bull; <strong>Window Analytics:</strong> <code>OVER()</code>, <code>PARTITION BY</code>, and ordering.<br>
               &bull; <strong>Ranking &amp; Value offsets:</strong> <code>ROW_NUMBER</code>, <code>RANK</code>, <code>LAG</code>, and <code>LEAD</code>.
            </p>
         </div>
         <p>These advanced tools allow database developers to perform complex calculations directly in SQL rather than in application code.</p>`,

        // Page 2 — UNION vs UNION ALL
        `<div class="page-chapter-label">Chapter 11 — UNION</div>
         <h2>UNION vs UNION ALL</h2>
         <hr class="page-divider">
         <p>Set operators combine results from two SELECT queries. The queries must be union-compatible (same number of columns, matching types).</p>
         <table class="compare-table" data-table-id="ch11-union-all">
            <tr><th>Operator</th><th>Duplicates?</th><th>Performance</th><th>Goal</th></tr>
            <tr><td><strong>UNION</strong></td><td>Eliminated (runs a costly distinct sort)</td><td>Slower</td><td>Distinct combination of sets</td></tr>
            <tr><td><strong>UNION ALL</strong></td><td>Kept (simply appends rows)</td><td>Very Fast</td><td>Simple concatenation of sets</td></tr>
         </table>
         <div class="sql-block"><code><span class="sql-comment">-- Fast union of students and teachers contacts</span>
<span class="sql-kw">SELECT</span> Name, Email <span class="sql-kw">FROM</span> Students
<span class="sql-kw">UNION ALL</span>
<span class="sql-kw">SELECT</span> Name, Email <span class="sql-kw">FROM</span> Teachers;</code></div>`,

        // Page 3 — INTERSECT & EXCEPT
        `<div class="page-chapter-label">Chapter 11 — Set Operators</div>
         <h2>INTERSECT &amp; EXCEPT</h2>
         <hr class="page-divider">
         <h3>INTERSECT</h3>
         <p>Returns only rows that are present in the results of **both** SELECT queries.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Find customers who are also suppliers</span>
<span class="sql-kw">SELECT</span> Email <span class="sql-kw">FROM</span> Customers
<span class="sql-kw">INTERSECT</span>
<span class="sql-kw">SELECT</span> Email <span class="sql-kw">FROM</span> Suppliers;</code></div>
         <h3>EXCEPT</h3>
         <p>Returns rows present in the first SELECT query but **not** in the second query (subtraction). In Oracle, this is called <code>MINUS</code>.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Students who have never submitted any labs</span>
<span class="sql-kw">SELECT</span> StudentID <span class="sql-kw">FROM</span> Students
<span class="sql-kw">EXCEPT</span>
<span class="sql-kw">SELECT</span> StudentID <span class="sql-kw">FROM</span> Submissions;</code></div>`,

        // Page 4 — Intro to Window Functions
        `<div class="page-chapter-label">Chapter 11 — Window Functions</div>
         <h2>Introduction to Window Functions</h2>
         <hr class="page-divider">
         <p>A **Window Function** performs calculations across a set of table rows that are related to the current row. Unlike a `GROUP BY` aggregation, a window function **does not collapse** rows. The output has the same number of rows as the input.</p>
         <p>We declare a window function using the <strong>OVER()</strong> clause. Inside, we specify:</p>
         <p style="font-size:0.8rem; line-height:1.6; text-align:left; color:#4a3558; margin-left:16px;">
            &bull; <strong>PARTITION BY:</strong> Splits rows into groups (like GROUP BY).<br>
            &bull; <strong>ORDER BY:</strong> Sorts rows within each partition.<br>
            &bull; <strong>ROWS/RANGE:</strong> Restricts the subset of rows (e.g. running average).
         </p>
         <div class="sql-block"><code><span class="sql-comment">-- Calculate running total price per category</span>
<span class="sql-kw">SELECT</span> Name, Category, Price,
       SUM(Price) <span class="sql-kw">OVER</span> (PARTITION BY Category ORDER BY Price) <span class="sql-kw">AS</span> RunningTotal
<span class="sql-kw">FROM</span> Products;</code></div>`,

        // Page 5 — Ranking Functions
        `<div class="page-chapter-label">Chapter 11 — Rankings</div>
         <h2>ROW_NUMBER, RANK, &amp; DENSE_RANK</h2>
         <hr class="page-divider">
         <p>Ranking window functions assign an integer sequence to each row within a partition, based on the sorting criteria.</p>
         <table class="compare-table" data-table-id="ch11-window-ranks">
            <tr><th>Function</th><th>Duplicates?</th><th>Skips Numbers?</th><th>Example Sequence</th></tr>
            <tr><td><code>ROW_NUMBER()</code></td><td>Unique index</td><td>No</td><td>1, 2, 3, 4, 5</td></tr>
            <tr><td><code>RANK()</code></td><td>Same rank</td><td>Yes (skips ahead)</td><td>1, 2, 2, 4, 5</td></tr>
            <tr><td><code>DENSE_RANK()</code></td><td>Same rank</td><td>No (dense sequence)</td><td>1, 2, 2, 3, 4</td></tr>
         </table>
         <div class="sql-block"><code><span class="sql-comment">-- Get rank order of students by grade</span>
<span class="sql-kw">SELECT</span> Name, Score,
       DENSE_RANK() <span class="sql-kw">OVER</span> (ORDER BY Score DESC) <span class="sql-kw">AS</span> ClassRank
<span class="sql-kw">FROM</span> Submissions;</code></div>`,

        // Page 6 — Value Functions
        `<div class="page-chapter-label">Chapter 11 — Value Functions</div>
         <h2>LAG and LEAD Offset Functions</h2>
         <hr class="page-divider">
         <p>Value window functions access values from other rows in the partition relative to the current row.</p>
         <p><code>LAG()</code> accesses data from a **previous** row (offset defaults to 1). <code>LEAD()</code> accesses data from a **following** row.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Compare current score with previous student's score</span>
<span class="sql-kw">SELECT</span> Name, Score,
       LAG(Score) <span class="sql-kw">OVER</span> (ORDER BY Score DESC) <span class="sql-kw">AS</span> PreviousScore
<span class="sql-kw">FROM</span> Submissions;</code></div>
         <p>This is extremely useful for running period-over-period financial audits or calculating changes over time without manual self-joins.</p>`,

        // Page 7 — Aggregate Window Functions
        `<div class="page-chapter-label">Chapter 11 — Window Aggregates</div>
         <h2>Aggregate Window Functions</h2>
         <hr class="page-divider">
         <p>You can use standard aggregate functions (`SUM`, `AVG`, `COUNT`, `MIN`, `MAX`) as window functions simply by appending the `OVER` clause.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Compare employee salary with their department average</span>
<span class="sql-kw">SELECT</span> Name, DeptID, Salary,
       AVG(Salary) <span class="sql-kw">OVER</span> (PARTITION BY DeptID) <span class="sql-kw">AS</span> DeptAvgSalary
<span class="sql-kw">FROM</span> Employees;</code></div>
          <p>This retains the full list of employees while showing the summary, which is perfect for building financial dashboard views.</p>`
    ],

    ch12: [
        // Page 1 — Database Creation
        `<div class="page-chapter-label">Chapter 12</div>
         <h2>Creating Databases</h2>
         <hr class="page-divider">
         <p>Before creating tables or query views, you must initialize the database container itself. SQL provides the <strong>CREATE DATABASE</strong> statement to set up a new empty database instance.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Basic database creation statement</span>
<span class="sql-kw">CREATE DATABASE</span> SalesDB;</code></div>
         <p>Depending on the database engine (PostgreSQL, SQL Server, MySQL), you can configure physical log files size, growth limits, and specific filepaths at the creation stage to optimize disk write speeds.</p>`,

        // Page 2 — Dropping Databases
        `<div class="page-chapter-label">Chapter 12 — Dropping Databases</div>
         <h2>Dropping Databases</h2>
         <hr class="page-divider">
         <p>The <strong>DROP DATABASE</strong> statement deletes the database along with all its tables, indexes, data rows, and schemas. **This action is irreversible.**</p>
         <div class="sql-block"><code><span class="sql-comment">-- Irreversible database deletion</span>
<span class="sql-kw">DROP DATABASE</span> SalesDB;</code></div>
         <p>Most engines require that **no active connections** exist on the target database to prevent data corruption during dropping. In PostgreSQL, you must run <code>TERMINATE ACTIONS</code> or disconnect clients first.</p>`,

        // Page 3 — Working with Schemas
        `<div class="page-chapter-label">Chapter 12 — Schemas</div>
         <h2>Working with Schemas</h2>
         <hr class="page-divider">
         <p>A **Schema** is a logical namespace partition inside a database. It groups related tables, views, and procedures, separating them from other departments in the same database (e.g. <code>sales</code> vs. <code>hr</code>).</p>
         <div class="sql-block"><code><span class="sql-comment">-- Create a logical schema namespace</span>
<span class="sql-kw">CREATE SCHEMA</span> HumanResources;
<span class="sql-kw">CREATE TABLE</span> HumanResources.Employees ( ID <span class="sql-type">INT</span> );</code></div>
         <p>Using schemas makes security management easier because you can grant user permissions on entire namespaces rather than individual tables.</p>`,

        // Page 4 — Character Sets & Collations
        `<div class="page-chapter-label">Chapter 12 — Collations</div>
         <h2>Character Sets &amp; Collations</h2>
         <hr class="page-divider">
         <p>When creating a database, setting the correct character encoding is vital for storing international data:</p>
         <p style="font-size:0.8rem; line-height:1.6; text-align:left; color:#4a3558; margin-left:16px;">
            &bull; <strong>Character Set (Encoding):</strong> Determines how characters are mapped to bytes (e.g. <code>UTF8</code> support for Japanese, emoji, etc.).<br>
            &bull; <strong>Collation:</strong> Defines sorting and comparison sequences (e.g. Case-Sensitive vs. Case-Insensitive, Accent-Sensitive).
         </p>
         <div class="sql-block"><code><span class="sql-comment">-- Create database with UTF-8 encoding in MySQL</span>
<span class="sql-kw">CREATE DATABASE</span> IntlDB
    <span class="sql-kw">CHARACTER SET</span> utf8mb4
    <span class="sql-kw">COLLATE</span> utf8mb4_unicode_ci;</code></div>`,

        // Page 5 — DB Config Best Practices
        `<div class="page-chapter-label">Chapter 12 — Best Practices</div>
         <h2>Configuration &amp; Administration</h2>
         <hr class="page-divider">
         <p>Once created, database maintenance is key to long-term performance stability:</p>
         <p style="font-size:0.8rem; line-height:1.6; text-align:left; color:#4a3558; margin-bottom:8px;">
            &bull; <strong>Pre-allocate Size:</strong> Avoid letting the database grow by 1MB increments, which fragments files on disk.<br>
            &bull; <strong>Separate Storage:</strong> Place physical log files (write-ahead logging) on faster SSDs separate from actual data files.<br>
            &bull; <strong>Scheduled Backups:</strong> Set up transaction log backups regularly to prevent disk space overflows.
         </p>
         <p style="text-align:center;color:#a8346e;font-weight:600;font-size:0.8rem;">Rule of Thumb: Maintain separate physical drives for Operating System, Database Data, and Transaction Logs!</p>`
    ],

    ch13: [
        // Page 1 — Alter Table Basics
        `<div class="page-chapter-label">Chapter 13</div>
         <h2>Altering Table Structures (DDL)</h2>
         <hr class="page-divider">
         <p>Requirements change, which means database schemas must adapt. SQL provides the **ALTER TABLE** statement to modify existing table definitions without losing existing data rows.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Alter table template structure</span>
<span class="sql-kw">ALTER TABLE</span> Employees ADD ColumnDefinition;</code></div>
         <p>ALTER TABLE is a Data Definition Language (DDL) command. It operates on database metadata and locks the target table during execution.</p>`,

        // Page 2 — Column Modification
        `<div class="page-chapter-label">Chapter 13 — Column Modifications</div>
         <h2>Adding &amp; Modifying Columns</h2>
         <hr class="page-divider">
         <p>You can add new columns, remove obsolete columns, or modify data types of existing columns in a table:</p>
         <div class="sql-block"><code><span class="sql-comment">-- 1. Add a new column</span>
<span class="sql-kw">ALTER TABLE</span> Employees <span class="sql-kw">ADD</span> Phone <span class="sql-type">VARCHAR</span>(20);

<span class="sql-comment">-- 2. Drop an existing column</span>
<span class="sql-kw">ALTER TABLE</span> Employees <span class="sql-kw">DROP COLUMN</span> Phone;

<span class="sql-comment">-- 3. Modify data type (PostgreSQL syntax)</span>
<span class="sql-kw">ALTER TABLE</span> Employees <span class="sql-kw">ALTER COLUMN</span> Salary <span class="sql-kw">TYPE</span> <span class="sql-type">DECIMAL</span>(12,2);</code></div>`,

        // Page 3 — Constraints Modification
        `<div class="page-chapter-label">Chapter 13 — Constraints</div>
         <h2>Adding &amp; Dropping Constraints</h2>
         <hr class="page-divider">
         <p>You can add or drop key constraints, check constraints, or defaults after the table has been populated:</p>
         <div class="sql-block"><code><span class="sql-comment">-- Add a CHECK constraint</span>
<span class="sql-kw">ALTER TABLE</span> Employees
    <span class="sql-kw">ADD CONSTRAINT</span> chk_Salary <span class="sql-kw">CHECK</span> (Salary >= 0);

<span class="sql-comment">-- Drop a constraint</span>
<span class="sql-kw">ALTER TABLE</span> Employees
    <span class="sql-kw">DROP CONSTRAINT</span> chk_Salary;</code></div>
         <p>If you add a constraint on a populated table, the database checks existing rows first. If any row violates the new constraint, the ALTER operation fails.</p>`,

        // Page 4 — Renaming Entities
        `<div class="page-chapter-label">Chapter 13 — Renaming</div>
         <h2>Renaming Tables &amp; Columns</h2>
         <hr class="page-divider">
         <p>Renaming table structures differs slightly across database engines. Most modern databases support renaming to preserve query references:</p>
         <div class="sql-block"><code><span class="sql-comment">-- Rename a column (PostgreSQL)</span>
<span class="sql-kw">ALTER TABLE</span> Employees <span class="sql-kw">RENAME COLUMN</span> OldName <span class="sql-kw">TO</span> NewName;

<span class="sql-comment">-- Rename a table (PostgreSQL)</span>
<span class="sql-kw">ALTER TABLE</span> Employees <span class="sql-kw">RENAME TO</span> Staff;</code></div>
         <p style="font-size:0.75rem; color:#7a6580;">Note: Renaming tables will break external application code, SQL views, and stored procedures that reference the old names, so use caution!</p>`,

        // Page 5 — DDL Altering Dangers
        `<div class="page-chapter-label">Chapter 13 — DDL Dangers</div>
         <h2>DDL Altering Hazards</h2>
         <hr class="page-divider">
         <p>Running DDL alter operations on large production tables is high-risk:</p>
         <p style="font-size:0.8rem; line-height:1.6; text-align:left; color:#4a3558; margin-bottom:8px;">
            &bull; <strong>Table Locks:</strong> Operations like adding a NOT NULL column with a default value can lock the table (reads &amp; writes blocked) for hours on millions of rows.<br>
            &bull; <strong>Downtime:</strong> Lock contentions can cascade, causing application API timeouts.<br>
            &bull; <strong>Safe Pattern:</strong> Add nullable columns first, populate data in batches, then alter column constraints to NOT NULL.
         </p>
         <p style="text-align:center;color:#a8346e;font-weight:600;font-size:0.8rem;">Best Practice: Run schema alterations during off-peak maintenance hours!</p>`
    ],

    ch14: [
        // Page 1 — Inserting Data
        `<div class="page-chapter-label">Chapter 14</div>
         <h2>Data Manipulation: Inserting</h2>
         <hr class="page-divider">
         <p>Data Manipulation Language (DML) manages table content. To add new rows, we use the **INSERT INTO** statement.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Basic column-specific insert</span>
<span class="sql-kw">INSERT INTO</span> Students (StudentID, Name, GroupID)
<span class="sql-kw">VALUES</span> (10, 'David', 101);</code></div>
         <p>Always specify the column list in your insert queries. This prevents queries from breaking if someone alters the table structure by adding or reordering columns later.</p>`,

        // Page 2 — Bulk Insertion
        `<div class="page-chapter-label">Chapter 14 — Bulk Insertion</div>
         <h2>Bulk Insert &amp; Select Inserter</h2>
         <hr class="page-divider">
         <p>You can insert multiple rows in a single SQL statement by comma-separating values lists, or by copying results directly from another SELECT query:</p>
         <div class="sql-block"><code><span class="sql-comment">-- 1. Multi-row insertion</span>
<span class="sql-kw">INSERT INTO</span> Students (StudentID, Name)
<span class="sql-kw">VALUES</span> (11, 'Eva'), (12, 'Frank');

<span class="sql-comment">-- 2. Insert from SELECT query</span>
<span class="sql-kw">INSERT INTO</span> ArchiveStudents
<span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> Students <span class="sql-kw">WHERE</span> GraduationYear &lt; 2026;</code></div>`,

        // Page 3 — Updating Rows
        `<div class="page-chapter-label">Chapter 14 — Updates</div>
         <h2>Updating Rows</h2>
         <hr class="page-divider">
         <p>The **UPDATE** statement modifies values in existing table rows. You must define which rows to modify using a <code>WHERE</code> clause.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Update student Group ID</span>
<span class="sql-kw">UPDATE</span> Students
<span class="sql-kw">SET</span> GroupID = 105, Status = 'Active'
<span class="sql-kw">WHERE</span> StudentID = 10;</code></div>
         <p style="color:#a8346e; font-weight:700; font-size:0.8rem; text-align:center;">WARNING: If you omit the WHERE clause in an UPDATE statement, every single row in the table will be overwritten!</p>`,

        // Page 4 — Upsert Operations
        `<div class="page-chapter-label">Chapter 14 — Upserts</div>
         <h2>Upsert Operations (ON CONFLICT)</h2>
         <hr class="page-divider">
         <p>An **Upsert** updates a row if it already exists (key collision), or inserts a new row if it doesn't. In PostgreSQL, this uses the <code>ON CONFLICT</code> clause.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Insert user, update score on primary key conflict</span>
<span class="sql-kw">INSERT INTO</span> Leaderboard (UserID, Score)
<span class="sql-kw">VALUES</span> (12, 150)
<span class="sql-kw">ON CONFLICT</span> (UserID)
<span class="sql-kw">DO UPDATE SET</span> Score = EXCLUDED.Score;</code></div>
         <p>In standard SQL, this logic can also be written using the more complex <code>MERGE</code> statement, commonly used in SQL Server and Oracle.</p>`,

        // Page 5 — DML Safety
        `<div class="page-chapter-label">Chapter 14 — DML Safety</div>
         <h2>DML Safekeeping &amp; Transactions</h2>
         <hr class="page-divider">
         <p>Data modifications can cause accidental data loss if not run safely:</p>
         <p style="font-size:0.8rem; line-height:1.6; text-align:left; color:#4a3558; margin-bottom:8px;">
            &bull; <strong>Always Wrap in Transactions:</strong> Run write queries inside <code>BEGIN TRANSACTION</code>. Verify counts, then type <code>COMMIT</code>. If an error is spotted, type <code>ROLLBACK</code>.<br>
            &bull; <strong>Safe Mode:</strong> Some IDEs prevent updates or deletes that lack a WHERE clause. Keep this feature enabled.
         </p>
         <div class="sql-block"><code><span class="sql-kw">BEGIN TRANSACTION</span>;
<span class="sql-kw">UPDATE</span> Products <span class="sql-kw">SET</span> Price = Price * 1.1 <span class="sql-kw">WHERE</span> Category = 'Books';
<span class="sql-comment">-- Verify first, then commit</span>
<span class="sql-kw">COMMIT</span>;</code></div>`
    ],

    ch15: [
        // Page 1 — Deleting Rows
        `<div class="page-chapter-label">Chapter 15</div>
         <h2>Data Manipulation: Deleting</h2>
         <hr class="page-divider">
         <p>To remove records from a table, SQL provides DML and DDL commands. The standard DML command is <strong>DELETE FROM</strong>.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Delete specific student</span>
<span class="sql-kw">DELETE FROM</span> Students
<span class="sql-kw">WHERE</span> StudentID = 12;</code></div>
         <p>DELETE removes rows one-by-one, evaluates constraints, triggers row-level actions (database triggers), and writes details for each deleted row to the transaction log, allowing rollbacks.</p>`,

        // Page 2 — Truncating Tables
        `<div class="page-chapter-label">Chapter 15 — Truncate</div>
         <h2>TRUNCATE TABLE Mechanics</h2>
         <hr class="page-divider">
         <p>The <strong>TRUNCATE TABLE</strong> command removes all rows from a table. It is a DDL operation that works by de-allocating the physical data pages storing the table data.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Instantly empty table data</span>
<span class="sql-kw">TRUNCATE TABLE</span> TempLogs;</code></div>
         <p>TRUNCATE is extremely fast because it bypasses triggers, doesn't scan rows, and writes minimal details to transaction logs. However, it cannot be run if the table is referenced by foreign keys.</p>`,

        // Page 3 — Dropping Tables
        `<div class="page-chapter-label">Chapter 15 — Dropping Tables</div>
         <h2>Dropping Tables (DROP TABLE)</h2>
         <hr class="page-divider">
         <p>The <strong>DROP TABLE</strong> statement completely deletes the table structure, metadata, indexes, permissions, and data rows from the database catalog.</p>
         <div class="sql-block"><code><span class="sql-comment">-- Drop table and remove references</span>
<span class="sql-kw">DROP TABLE</span> Students <span class="sql-kw">CASCADE</span>;</code></div>
         <p>Using the <code>CASCADE</code> option automatically drops any foreign key constraints or views that reference this table, preventing broken schema dependency paths.</p>`,

        // Page 4 — Comparison Table
        `<div class="page-chapter-label">Chapter 15 — Deletion Methods</div>
         <h2>DELETE vs. TRUNCATE vs. DROP</h2>
         <hr class="page-divider">
         <p>Choosing the correct table removal command is vital for speed and database safety:</p>
         <table class="compare-table" data-table-id="ch15-delete-comparison">
            <tr><th>Criteria</th><th>DELETE FROM</th><th>TRUNCATE TABLE</th><th>DROP TABLE</th></tr>
            <tr><td>Category</td><td>DML (Data Manipulation)</td><td>DDL (Data Definition)</td><td>DDL (Data Definition)</td></tr>
            <tr><td>Removes...</td><td>Selected rows (via WHERE)</td><td>All rows (empties table)</td><td>Entire table &amp; structure</td></tr>
            <tr><td>Speed</td><td>Slower (row-by-row log)</td><td>Extremely fast</td><td>Instant (catalog update)</td></tr>
            <tr><td>Triggers</td><td>Fires (DELETE triggers)</td><td>Does NOT fire triggers</td><td>Does NOT fire triggers</td></tr>
            <tr><td>Rollback</td><td>Fully supported</td><td>Supported (Postgres only)</td><td>Supported (Postgres only)</td></tr>
         </table>`,

        // Page 5 — Soft Deletes
        `<div class="page-chapter-label">Chapter 15 — Safety</div>
         <h2>Soft Deletes &amp; Safe Deleting</h2>
         <hr class="page-divider">
         <p>In production applications, we rarely delete data physically from tables. We use **Soft Deletes** by adding a status column (e.g. <code>is_deleted</code> or <code>deleted_at</code>).</p>
         <div class="sql-block"><code><span class="sql-comment">-- Soft delete: set status flag only</span>
<span class="sql-kw">UPDATE</span> Students
<span class="sql-kw">SET</span> IsDeleted = 1, DeletedAt = NOW()
<span class="sql-kw">WHERE</span> StudentID = 10;</code></div>
         <p>This preserves historical audit trails, avoids breaking child table referential integrity constraints, and makes recovery from accidental deletion simple.</p>`
    ]
};

/* ==========================================================
   TABLE TRANSLATIONS (English & Japanese)
   ========================================================== */
const TABLE_TRANSLATIONS = {
    'ch1-integers': {
        en: `
            <tr><th>Type</th><th>Size</th><th>Range</th><th>Use Case</th></tr>
            <tr><td><code>TINYINT</code></td><td>1 byte</td><td>0 to 255</td><td>Age, status flags</td></tr>
            <tr><td><code>SMALLINT</code></td><td>2 bytes</td><td>−32,768 to 32,767</td><td>Year, small counters</td></tr>
            <tr><td><code>INT</code></td><td>4 bytes</td><td>−2.1B to 2.1B</td><td>IDs, quantities (most used)</td></tr>
            <tr><td><code>BIGINT</code></td><td>8 bytes</td><td>±9.2 quintillion</td><td>Large counters, timestamps</td></tr>
        `,
        jp: `
            <tr><th>データ型</th><th>サイズ</th><th>範囲</th><th>主な用途</th></tr>
            <tr><td><code>TINYINT</code></td><td>1バイト</td><td>0 から 255</td><td>年齢、ステータスフラグ</td></tr>
            <tr><td><code>SMALLINT</code></td><td>2バイト</td><td>−32,768 から 32,767</td><td>年、小さなカウンタ</td></tr>
            <tr><td><code>INT</code></td><td>4バイト</td><td>−21億 から 21億</td><td>ID、数量（最も使用される）</td></tr>
            <tr><td><code>BIGINT</code></td><td>8バイト</td><td>±9.2京</td><td>巨大なカウンタ、タイムスタンプ</td></tr>
        `
    },
    'ch1-decimals': {
        en: `
            <tr><th>Type</th><th>Precision</th><th>Use Case</th></tr>
            <tr><td><code>FLOAT</code></td><td>~7 digits</td><td>Scientific data (approximate)</td></tr>
            <tr><td><code>REAL</code></td><td>~15 digits</td><td>More precise floats</td></tr>
            <tr><td><code>DECIMAL(p,s)</code></td><td>Exact</td><td>Money, financial data (most used)</td></tr>
        `,
        jp: `
            <tr><th>データ型</th><th>精度</th><th>主な用途</th></tr>
            <tr><td><code>FLOAT</code></td><td>約7桁</td><td>科学データ（近似値）</td></tr>
            <tr><td><code>REAL</code></td><td>約15桁</td><td>より高精度な浮動小数点数</td></tr>
            <tr><td><code>DECIMAL(p,s)</code></td><td>厳密（正確）</td><td>金額、財務データ（最も使用される）</td></tr>
        `
    },
    'ch1-datetime': {
        en: `
            <tr><th>Type</th><th>Format</th><th>Example</th><th>Use Case</th></tr>
            <tr><td><code>DATE</code></td><td>YYYY-MM-DD</td><td>2025-06-22</td><td>Birthdays, deadlines</td></tr>
            <tr><td><code>TIME</code></td><td>HH:MM:SS</td><td>14:30:00</td><td>Schedules, shifts</td></tr>
            <tr><td><code>DATETIME</code></td><td>YYYY-MM-DD HH:MM:SS</td><td>2025-06-22 14:30:00</td><td>Created/Updated timestamps (most used)</td></tr>
            <tr><td><code>TIMESTAMP</code></td><td>Auto UTC</td><td>Auto-generated</td><td>Change tracking</td></tr>
        `,
        jp: `
            <tr><th>データ型</th><th>フォーマット</th><th>例</th><th>主な用途</th></tr>
            <tr><td><code>DATE</code></td><td>YYYY-MM-DD</td><td>2025-06-22</td><td>誕生日、締め切り</td></tr>
            <tr><td><code>TIME</code></td><td>HH:MM:SS</td><td>14:30:00</td><td>スケジュール、シフト勤務</td></tr>
            <tr><td><code>DATETIME</code></td><td>YYYY-MM-DD HH:MM:SS</td><td>2025-06-22 14:30:00</td><td>作成/更新時のタイムスタンプ（最も使用される）</td></tr>
            <tr><td><code>TIMESTAMP</code></td><td>自動 UTC</td><td>自動生成</td><td>変更履歴の追跡</td></tr>
        `
    },
    'ch1-reference': {
        en: `
            <tr><th>Type</th><th>Category</th><th>When to Use</th></tr>
            <tr><td><code>INT</code></td><td>Numeric</td><td>IDs, counts, quantities — your default integer</td></tr>
            <tr><td><code>DECIMAL(p,s)</code></td><td>Numeric</td><td>Money, prices — when you need exact precision</td></tr>
            <tr><td><code>VARCHAR(n)</code></td><td>Text</td><td>Names, emails, addresses — most common text type</td></tr>
            <tr><td><code>CHAR(n)</code></td><td>Text</td><td>Fixed codes — country codes, status codes</td></tr>
            <tr><td><code>TEXT</code></td><td>Text</td><td>Long content — descriptions, articles, notes</td></tr>
            <tr><td><code>BIT</code></td><td>Boolean</td><td>True/false flags — is_active, is_verified</td></tr>
            <tr><td><code>DATE</code></td><td>Temporal</td><td>Calendar dates — birthdays, deadlines</td></tr>
            <tr><td><code>DATETIME</code></td><td>Temporal</td><td>Precise timestamps — created_at, updated_at</td></tr>
        `,
        jp: `
            <tr><th>データ型</th><th>カテゴリ</th><th>使用するタイミング</th></tr>
            <tr><td><code>INT</code></td><td>数値型</td><td>ID、カウント、数量 — 標準的な整数</td></tr>
            <tr><td><code>DECIMAL(p,s)</code></td><td>数値型</td><td>金額、価格 — 厳密な精度が必要な場合</td></tr>
            <tr><td><code>VARCHAR(n)</code></td><td>文字列型</td><td>名前、メールアドレス、住所 — 最も一般的な文字列</td></tr>
            <tr><td><code>CHAR(n)</code></td><td>文字列型</td><td>固定長のコード — 国名コード、ステータスコード</td></tr>
            <tr><td><code>TEXT</code></td><td>文字列型</td><td>長いコンテンツ — 説明文、記事、メモ</td></tr>
            <tr><td><code>BIT</code></td><td>真偽値型</td><td>True/Falseフラグ — 有効状態（is_active）、認証済（is_verified）</td></tr>
            <tr><td><code>DATE</code></td><td>日付/時間型</td><td>カレンダーの日付 — 誕生日、締め切り</td></tr>
            <tr><td><code>DATETIME</code></td><td>日付/時間型</td><td>正確なタイムスタンプ — 作成日時（created_at）、更新日時（updated_at）</td></tr>
        `
    },
    'ch2-anatomy': {
        en: `
            <tr><th>StudentID</th><th>Name</th><th>Email</th><th>Age</th><th>Active</th></tr>
            <tr><td>1</td><td>Maria</td><td>maria@ubb.ro</td><td>21</td><td>✓</td></tr>
            <tr><td>2</td><td>Andrei</td><td>andrei@ubb.ro</td><td>22</td><td>✓</td></tr>
            <tr><td>3</td><td>Elena</td><td>elena@ubb.ro</td><td>20</td><td>✗</td></tr>
        `,
        jp: `
            <tr><th>学生ID</th><th>名前</th><th>メール</th><th>年齢</th><th>有効</th></tr>
            <tr><td>1</td><td>マリア</td><td>maria@ubb.ro</td><td>21</td><td>✓</td></tr>
            <tr><td>2</td><td>アンドレイ</td><td>andrei@ubb.ro</td><td>22</td><td>✓</td></tr>
            <tr><td>3</td><td>エレナ</td><td>elena@ubb.ro</td><td>20</td><td>✗</td></tr>
        `
    },
    'ch2-constraints': {
        en: `
            <tr><th>Constraint</th><th>Meaning</th><th>Example</th></tr>
            <tr><td><code>PRIMARY KEY</code></td><td>Unique identifier for each row</td><td>StudentID</td></tr>
            <tr><td><code>NOT NULL</code></td><td>Column cannot be empty</td><td>FirstName</td></tr>
            <tr><td><code>UNIQUE</code></td><td>All values must be different</td><td>Email</td></tr>
            <tr><td><code>DEFAULT</code></td><td>Automatic value if none given</td><td>IsActive = 1</td></tr>
            <tr><td><code>CHECK</code></td><td>Value must satisfy a condition</td><td>Age > 0</td></tr>
            <tr><td><code>FOREIGN KEY</code></td><td>Links to another table's PK</td><td>DeptID → Departments</td></tr>
        `,
        jp: `
            <tr><th>制約</th><th>意味</th><th>例</th></tr>
            <tr><td><code>PRIMARY KEY</code></td><td>各行を一意に識別するキー（主キー）</td><td>StudentID</td></tr>
            <tr><td><code>NOT NULL</code></td><td>列を空（NULL）にできない</td><td>FirstName</td></tr>
            <tr><td><code>UNIQUE</code></td><td>すべての値が一意である必要がある</td><td>Email</td></tr>
            <tr><td><code>DEFAULT</code></td><td>値が指定されない場合の自動値</td><td>IsActive = 1</td></tr>
            <tr><td><code>CHECK</code></td><td>値が条件を満たさなければならない</td><td>Age > 0</td></tr>
            <tr><td><code>FOREIGN KEY</code></td><td>他のテーブルの主キーを参照（外部キー）</td><td>DeptID → Departments</td></tr>
        `
    },
    'ch3-fk-rules': {
        en: `
            <tr><th>Rule</th><th>Meaning</th></tr>
            <tr><td>Referential Integrity</td><td>You can't insert a DeptID that doesn't exist in the Departments table</td></tr>
            <tr><td>Cascade Delete</td><td>Optionally delete child rows when parent is deleted</td></tr>
            <tr><td>Cascade Update</td><td>Optionally update child FK when parent PK changes</td></tr>
        `,
        jp: `
            <tr><th>ルール</th><th>意味</th></tr>
            <tr><td>参照整合性</td><td>Departmentsに存在しないDeptIDの挿入は不可</td></tr>
            <tr><td>カスケード削除</td><td>親行が削除された際に、連動して子行も自動削除</td></tr>
            <tr><td>カスケード更新</td><td>親の主キー変更時に、連動して子の外部キーを自動更新</td></tr>
        `
    },
    'ch3-parent-child': {
        en: `
            <tr><th>Aspect</th><th>Parent Table</th><th>Child Table</th></tr>
            <tr><td>Has the…</td><td>Primary Key (referenced)</td><td>Foreign Key (references PK)</td></tr>
            <tr><td>Created…</td><td>First (before child)</td><td>After parent exists</td></tr>
            <tr><td>Deleted…</td><td>After children, or with CASCADE</td><td>Freely (doesn't break refs)</td></tr>
            <tr><td>Example</td><td>Departments</td><td>Students (has DeptID FK)</td></tr>
        `,
        jp: `
            <tr><th>特徴</th><th>親テーブル（Parent）</th><th>子テーブル（Child）</th></tr>
            <tr><td>保持するキー</td><td>主キー（PRIMARY KEY - 参照先）</td><td>外部キー（FOREIGN KEY - 参照元）</td></tr>
            <tr><td>作成順序</td><td>先（子テーブルより前）</td><td>後（親テーブルの存在後）</td></tr>
            <tr><td>削除順序</td><td>子テーブルの後（又はCASCADE）</td><td>自由（参照を破損しない）</td></tr>
            <tr><td>例</td><td>Departments</td><td>Students (DeptID 外部キーを保持)</td></tr>
        `
    },
    'ch4-normal-forms': {
        en: `
            <tr><th>Normal Form</th><th>Rule / Constraint</th><th>Goal</th></tr>
            <tr><td><strong>1NF</strong> (First)</td><td>All attributes must contain atomic (single) values. No lists or sets.</td><td>Eliminate repeating groups</td></tr>
            <tr><td><strong>2NF</strong> (Second)</td><td>Must be in 1NF, and no non-key attribute can depend on a <em>part</em> of a candidate key (no partial dependencies).</td><td>Eliminate partial key dependencies</td></tr>
            <tr><td><strong>3NF</strong> (Third)</td><td>Must be in 2NF, and all non-key attributes must depend <em>only</em> on the key (no transitive dependencies: X &rarr; Y &rarr; Z).</td><td>Eliminate transitive dependencies</td></tr>
        `,
        jp: `
            <tr><th>正規形</th><th>ルール / 制約</th><th>目的</th></tr>
            <tr><td><strong>第1正規形</strong> (1NF)</td><td>すべての属性が一意（単一値）でなければならない。リストやセットは不可。</td><td>繰り返しグループの排除</td></tr>
            <tr><td><strong>第2正規形</strong> (2NF)</td><td>第1正規形を満たし、すべての非キー属性が候補キーの<em>一部</em>に依存しない（部分関数依存の排除）。</td><td>部分依存の排除</td></tr>
            <tr><td><strong>第3正規形</strong> (3NF)</td><td>第2正規形を満たし、すべての非キー属性が候補キー<em>のみ</em>に直接依存する（推移的関数依存の排除: X &rarr; Y &rarr; Z）。</td><td>推移的依存の排除</td></tr>
        `
    },
    'ch5-set-ops': {
        en: `
            <tr><th>Operation</th><th>Notation</th><th>SQL Equivalent</th><th>Description</th></tr>
            <tr><td><strong>Union</strong></td><td>R &cup; S</td><td>UNION</td><td>All tuples in R or S (no duplicates)</td></tr>
            <tr><td><strong>Intersection</strong></td><td>R &cap; S</td><td>INTERSECT</td><td>Tuples present in both R and S</td></tr>
            <tr><td><strong>Set-Difference</strong></td><td>R &minus; S</td><td>EXCEPT / MINUS</td><td>Tuples in R but not in S</td></tr>
            <tr><td><strong>Cross-Product</strong></td><td>R &times; S</td><td>CROSS JOIN</td><td>All combinations of tuples from R and S</td></tr>
        `,
        jp: `
            <tr><th>演算</th><th>記法</th><th>SQLの同等記述</th><th>説明</th></tr>
            <tr><td><strong>和集合 (Union)</strong></td><td>R &cup; S</td><td>UNION</td><td>RまたはSのすべてのタプル（重複なし）</td></tr>
            <tr><td><strong>積集合 (Intersection)</strong></td><td>R &cap; S</td><td>INTERSECT</td><td>RとSの両方に存在するタプル</td></tr>
            <tr><td><strong>差集合 (Difference)</strong></td><td>R &minus; S</td><td>EXCEPT / MINUS</td><td>Rには存在するがSには存在しないタプル</td></tr>
            <tr><td><strong>直積 (Cross-Product)</strong></td><td>R &times; S</td><td>CROSS JOIN</td><td>RとSのタプルのすべての組み合わせ</td></tr>
        `
    },
    'ch5-joins': {
        en: `
            <tr><th>Join Type</th><th>Notation</th><th>SQL Equivalent</th><th>Definition / Meaning</th></tr>
            <tr><td><strong>Theta-Join</strong></td><td>R &bowtie;<sub>c</sub> S</td><td>INNER JOIN ON c</td><td>Combined relations filtered by condition c: <code>&sigma;<sub>c</sub>(R &times; S)</code></td></tr>
            <tr><td><strong>Equi-Join</strong></td><td>R &bowtie;<sub>A=B</sub> S</td><td>INNER JOIN ON A=B</td><td>A Theta-Join where the join condition consists only of equalities</td></tr>
            <tr><td><strong>Natural Join</strong></td><td>R &bowtie; S</td><td>NATURAL JOIN</td><td>Equi-join on all columns with matching names, projecting out redundant columns</td></tr>
        `,
        jp: `
            <tr><th>結合の種類</th><th>記法</th><th>SQLの同等記述</th><th>定義 / 意味</th></tr>
            <tr><td><strong>シータ結合</strong></td><td>R &bowtie;<sub>c</sub> S</td><td>INNER JOIN ON c</td><td>結合された関係を条件 c でフィルタリング: <code>&sigma;<sub>c</sub>(R &times; S)</code></td></tr>
            <tr><td><strong>等価結合</strong></td><td>R &bowtie;<sub>A=B</sub> S</td><td>INNER JOIN ON A=B</td><td>結合条件が等価比較のみで構成されるシータ結合</td></tr>
            <tr><td><strong>自然結合</strong></td><td>R &bowtie; S</td><td>NATURAL JOIN</td><td>名前が一致するすべての列での等価結合（重複する列は1つのみ投影）</td></tr>
        `
    },
    'ch6-association-mapping': {
        en: `
            <tr><th>Multiplicity</th><th>Implementation Strategy</th><th>Primary Key Choice</th></tr>
            <tr><td><strong>1 : 0..1</strong> or <strong>1 : N</strong></td><td>Foreign Key in child/dependent table.</td><td>Separate primary key in each table.</td></tr>
            <tr><td><strong>M : N</strong> (Many-to-Many)</td><td>Create an additional <strong>intersection/junction table</strong>.</td><td>Composite primary key made of both foreign keys.</td></tr>
            <tr><td><strong>Association Class</strong></td><td>Intersection table includes columns for all attributes of the association class.</td><td>Composite of the two foreign keys, or a new surrogate key.</td></tr>
        `,
        jp: `
            <tr><th>多重度</th><th>実装戦略</th><th>主キーの選択</th></tr>
            <tr><td><strong>1 : 0..1</strong> または <strong>1 : N</strong></td><td>子（依存する）テーブルに外部キーを配置。</td><td>各テーブルに個別の主キー。</td></tr>
            <tr><td><strong>M : N</strong> (多重度)</td><td>別の中間（交差/結合）テーブルを作成。</td><td>両方の外部キーから成る複合主キー。</td></tr>
            <tr><td><strong>関連クラス</strong></td><td>中間テーブルに関連クラスのすべての属性列を含める。</td><td>2つの外部キーの複合主キー、又は新しいサロゲートキー。</td></tr>
        `
    },
    'ch7-left-join': {
        en: `
            <tr><th>StudentID</th><th>Student Name</th><th>GroupID</th><th>GroupName</th></tr>
            <tr><td>1</td><td>Alice</td><td>101</td><td>Group A</td></tr>
            <tr><td>2</td><td>Bob</td><td>102</td><td>Group B</td></tr>
            <tr><td>3</td><td>Charlie</td><td>NULL</td><td><strong>NULL</strong></td></tr>
        `,
        jp: `
            <tr><th>学生ID (StudentID)</th><th>学生名 (Student Name)</th><th>グループID (GroupID)</th><th>グループ名 (GroupName)</th></tr>
            <tr><td>1</td><td>アリス (Alice)</td><td>101</td><td>グループA (Group A)</td></tr>
            <tr><td>2</td><td>ボブ (Bob)</td><td>102</td><td>グループB (Group B)</td></tr>
            <tr><td>3</td><td>チャーリー (Charlie)</td><td>NULL</td><td><strong>NULL</strong></td></tr>
        `
    },
    'ch8-having-vs-where': {
        en: `
            <tr><th>Clause</th><th>Executed…</th><th>Can Use Aggregates?</th><th>Purpose</th></tr>
            <tr><td><strong>WHERE</strong></td><td>Before grouping (GROUP BY)</td><td>No</td><td>Filters raw input rows</td></tr>
            <tr><td><strong>HAVING</strong></td><td>After grouping (GROUP BY)</td><td>Yes</td><td>Filters aggregated groups</td></tr>
        `,
        jp: `
            <tr><th>句 (Clause)</th><th>実行順序 (Executed…)</th><th>集計関数は使えるか？</th><th>目的</th></tr>
            <tr><td><strong>WHERE</strong></td><td>グループ化 (GROUP BY) の前</td><td>いいえ</td><td>生データの行をフィルタリング</td></tr>
            <tr><td><strong>HAVING</strong></td><td>グループ化 (GROUP BY) の後</td><td>はい</td><td>集約されたグループをフィルタリング</td></tr>
        `
    },
    'ch11-union-all': {
        en: `
            <tr><th>Operator</th><th>Duplicates?</th><th>Performance</th><th>Goal</th></tr>
            <tr><td><strong>UNION</strong></td><td>Eliminated (runs a costly distinct sort)</td><td>Slower</td><td>Distinct combination of sets</td></tr>
            <tr><td><strong>UNION ALL</strong></td><td>Kept (simply appends rows)</td><td>Very Fast</td><td>Simple concatenation of sets</td></tr>
        `,
        jp: `
            <tr><th>演算子 (Operator)</th><th>重複行 (Duplicates?)</th><th>処理速度 (Performance)</th><th>目的</th></tr>
            <tr><td><strong>UNION</strong></td><td>排除する（コストの高い重複排除ソートを実行）</td><td>遅い</td><td>一意な行のみの和集合</td></tr>
            <tr><td><strong>UNION ALL</strong></td><td>保持する（単に行を結合）</td><td>非常に高速</td><td>単純な結果セットの結合</td></tr>
        `
    },
    'ch11-window-ranks': {
        en: `
            <tr><th>Function</th><th>Duplicates?</th><th>Skips Numbers?</th><th>Example Sequence</th></tr>
            <tr><td><code>ROW_NUMBER()</code></td><td>Unique index</td><td>No</td><td>1, 2, 3, 4, 5</td></tr>
            <tr><td><code>RANK()</code></td><td>Same rank</td><td>Yes (skips ahead)</td><td>1, 2, 2, 4, 5</td></tr>
            <tr><td><code>DENSE_RANK()</code></td><td>Same rank</td><td>No (dense sequence)</td><td>1, 2, 2, 3, 4</td></tr>
        `,
        jp: `
            <tr><th>関数 (Function)</th><th>重複値の扱い</th><th>順位の飛び</th><th>順序の例</th></tr>
            <tr><td><code>ROW_NUMBER()</code></td><td>一意のインデックス</td><td>いいえ</td><td>1, 2, 3, 4, 5</td></tr>
            <tr><td><code>RANK()</code></td><td>同じ順位</td><td>はい（間を空ける）</td><td>1, 2, 2, 4, 5</td></tr>
            <tr><td><code>DENSE_RANK()</code></td><td>同じ順位</td><td>いいえ（間を空けない）</td><td>1, 2, 2, 3, 4</td></tr>
        `
    },
    'ch15-delete-comparison': {
        en: `
            <tr><th>Criteria</th><th>DELETE FROM</th><th>TRUNCATE TABLE</th><th>DROP TABLE</th></tr>
            <tr><td>Category</td><td>DML (Data Manipulation)</td><td>DDL (Data Definition)</td><td>DDL (Data Definition)</td></tr>
            <tr><td>Removes...</td><td>Selected rows (via WHERE)</td><td>All rows (empties table)</td><td>Entire table &amp; structure</td></tr>
            <tr><td>Speed</td><td>Slower (row-by-row log)</td><td>Extremely fast</td><td>Instant (catalog update)</td></tr>
            <tr><td>Triggers</td><td>Fires (DELETE triggers)</td><td>Does NOT fire triggers</td><td>Does NOT fire triggers</td></tr>
            <tr><td>Rollback</td><td>Fully supported</td><td>Supported (Postgres only)</td><td>Supported (Postgres only)</td></tr>
        `,
        jp: `
            <tr><th>項目</th><th>DELETE FROM</th><th>TRUNCATE TABLE</th><th>DROP TABLE</th></tr>
            <tr><td>分類</td><td>DML (データ操作言語)</td><td>DDL (データ定義言語)</td><td>DDL (データ定義言語)</td></tr>
            <tr><td>削除対象</td><td>選択された行（WHERE句による）</td><td>すべての行（テーブルを空にする）</td><td>テーブル全体およびその構造</td></tr>
            <tr><td>処理速度</td><td>低速（行ごとのログ記録）</td><td>非常に高速</td><td>即時（カタログの更新のみ）</td></tr>
            <tr><td>トリガー</td><td>実行される (DELETEトリガー)</td><td>実行されない</td><td>実行されない</td></tr>
            <tr><td>ロールバック</td><td>完全サポート</td><td>サポート（Postgresのみ）</td><td>サポート（Postgresのみ）</td></tr>
        `
    }
};

function setupTableTranslations() {
    const tables = lessonBook.querySelectorAll('table.compare-table');
    tables.forEach((table, index) => {
        const tableId = table.getAttribute('data-table-id') || `table-${index}`;
        table.setAttribute('data-table-id', tableId);

        // Avoid double wrapping
        if (table.parentNode.classList.contains('compare-table-wrap')) return;

        // Wrap the table in a wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'compare-table-wrap';
        if (table.style.margin) {
            wrapper.style.margin = table.style.margin;
            table.style.margin = '';
        }
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);

        // Create language badge
        const badge = document.createElement('div');
        badge.className = 'table-lang-badge';
        badge.textContent = 'EN';
        wrapper.appendChild(badge);

        // Create timer ring
        const timerRing = document.createElement('div');
        timerRing.className = 'table-timer-ring';
        timerRing.innerHTML = `<svg viewBox="0 0 22 22"><circle cx="11" cy="11" r="9"></circle></svg>`;
        wrapper.appendChild(timerRing);

        let hoverTimer = null;
        let isTranslated = false;

        wrapper.addEventListener('mouseenter', () => {
            if (isTranslated) return;
            table.classList.add('hover-active');
            timerRing.classList.add('active');

            hoverTimer = setTimeout(() => {
                // Trigger translation flip
                table.classList.add('translating');
                
                // Halfway through rotation (300ms)
                setTimeout(() => {
                    const translation = TABLE_TRANSLATIONS[tableId];
                    if (translation && translation.jp) {
                        table.innerHTML = translation.jp;
                    }
                    badge.textContent = 'JP';
                    badge.classList.add('visible');
                }, 300);

                // After animation completes (600ms)
                setTimeout(() => {
                    table.classList.remove('translating');
                    table.classList.add('translated');
                    isTranslated = true;
                }, 600);
            }, 3000);
        });

        wrapper.addEventListener('mouseleave', () => {
            if (hoverTimer) {
                clearTimeout(hoverTimer);
                hoverTimer = null;
            }
            timerRing.classList.remove('active');
            table.classList.remove('hover-active');

            // Reset the stroke-dashoffset transition immediately
            const circle = timerRing.querySelector('circle');
            if (circle) {
                circle.style.transition = 'none';
                circle.style.strokeDashoffset = '56.5';
                // Trigger reflow
                circle.getBoundingClientRect();
                circle.style.transition = '';
            }

            if (isTranslated) {
                // Flip back to English
                table.classList.add('translating');
                
                setTimeout(() => {
                    const translation = TABLE_TRANSLATIONS[tableId];
                    if (translation && translation.en) {
                        table.innerHTML = translation.en;
                    }
                    badge.textContent = 'EN';
                    badge.classList.remove('visible');
                }, 300);

                setTimeout(() => {
                    table.classList.remove('translating', 'translated');
                    isTranslated = false;
                }, 600);
            }
        });
    });
}


/* ==========================================================
   DOM REFERENCES
   ========================================================== */
const $ = id => document.getElementById(id);
const introSection   = $('intro-section');
const bookOverlay    = $('book-overlay');
const book           = $('book');
const bookCoverFront = $('book-cover-front');
const pageContent    = $('page-content');
const bookCloseBtn   = $('book-close-btn');
const bookLabel      = $('book-label');
const bookTitle      = $('book-title');
const bookSubtitle   = $('book-subtitle');
const fadeOverlay    = $('fade-overlay');
const contentPage    = $('content-page');
const timelineTitle  = $('timeline-title');
const timelineSub    = $('timeline-subtitle');
const timelineWrapper= $('timeline-wrapper');
const timelineTrack  = $('timeline-track');
const lessonViewer   = $('lesson-viewer');
const lessonBook     = $('lesson-book');
const lessonPageInd  = $('lesson-page-indicator');
const lessonPrev     = $('lesson-prev');
const lessonNext     = $('lesson-next');
const lessonBackBtn  = $('lesson-back-btn');
const backBtn        = $('back-btn');
const navManual      = $('nav-manual');
const navBuilding    = $('nav-building');
const btnManual      = $('btn-manual');
const btnBuilding    = $('btn-building');
const navHome        = $('nav-home');
const creditsFooter  = $('credits-footer');

let currentBookType = null;
let currentChapterId = null;
let currentLessonPage = 0;
let totalLessonPages = 0;


/* ==========================================================
   BOOK — Open / Close / Navigate
   ========================================================== */
function openBook(type) {
    currentBookType = type;
    const data = BOOK_DATA[type];
    bookLabel.textContent = data.label;
    bookTitle.innerHTML = data.coverTitle;
    bookSubtitle.textContent = data.coverSubtitle;
    buildPageContent(data);
    navManual.classList.toggle('active', type === 'manual');
    navBuilding.classList.toggle('active', type === 'building');
    introSection.classList.add('hidden');
    bookOverlay.classList.add('visible');
    setTimeout(() => book.classList.add('open'), 600);
}

function closeBook() {
    book.classList.remove('open');
    setTimeout(() => {
        bookOverlay.classList.remove('visible');
        introSection.classList.remove('hidden');
        navManual.classList.add('active');
        navBuilding.classList.remove('active');
        currentBookType = null;
    }, 500);
}

function buildPageContent(data) {
    pageContent.innerHTML = `
        <div class="page-header">${data.pageHeader}</div>
        <p class="page-subtitle">${data.pageSubtitle}</p>
        <div class="chapter-list">
            ${data.chapters.map((ch, i) => `
                <div class="chapter-item" data-chapter-id="${ch.id}" data-chapter-title="${ch.title}">
                    <span class="chapter-number">${String(i+1).padStart(2,'0')}</span>
                    <div class="chapter-icon">${ch.icon}</div>
                    <div class="chapter-title">${ch.title}</div>
                    <div class="chapter-desc">${ch.desc}</div>
                    <div class="chapter-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>
                </div>`).join('')}
        </div>`;
    pageContent.querySelectorAll('.chapter-item').forEach(item => {
        item.addEventListener('click', () => navigateToTimeline(item.dataset.chapterId, item.dataset.chapterTitle));
    });
}


/* ==========================================================
   TIMELINE
   ========================================================== */
function navigateToTimeline(chapterId, chapterTitle) {
    currentChapterId = chapterId;
    book.classList.remove('open');
    setTimeout(() => fadeOverlay.classList.add('active'), 300);
    setTimeout(() => {
        bookOverlay.classList.remove('visible');
        buildTimeline(chapterId);
        contentPage.classList.add('visible');
        creditsFooter.style.zIndex = '850';
        setTimeout(() => fadeOverlay.classList.remove('active'), 200);
    }, 900);
}

function buildTimeline(chapterId) {
    const data = TIMELINE_DATA[chapterId];
    if (!data) return;
    timelineTitle.textContent = data.title;
    timelineSub.textContent = data.subtitle;

    // Clear previous
    timelineTrack.innerHTML = '<div class="timeline-line"></div>';
    timelineTrack.style.transform = 'translateX(0)';

    data.bubbles.forEach((b, i) => {
        const bubble = document.createElement('div');
        bubble.className = 'tl-bubble';
        bubble.style.animationDelay = `${i * 0.08}s`;
        bubble.innerHTML = `
            <div class="tl-popup">
                <div class="tl-popup-badge">${b.popupTitle.split('—')[0] || b.popupTitle}</div>
                <div class="tl-popup-title">${b.popupTitle}</div>
                <div class="tl-popup-desc">${b.popupDesc}</div>
            </div>
            <div class="tl-dot" data-id="${b.id}" data-has-lesson="${b.hasLesson}">
                <span class="tl-dot-inner">${b.num}</span>
            </div>
            <div class="tl-label">${b.label}</div>`;
        timelineTrack.appendChild(bubble);

        // Click to open lesson
        bubble.querySelector('.tl-dot').addEventListener('click', () => {
            if (b.hasLesson && LESSON_PAGES[b.id]) openLesson(b.id);
        });
    });

    initDrag();
}

/* --- Drag to scroll --- */
function initDrag() {
    let isDragging = false, startX = 0, scrollLeft = 0;
    const el = timelineWrapper;
    const track = timelineTrack;
    let currentX = 0;

    function getMaxScroll() {
        return Math.max(0, track.scrollWidth - el.clientWidth);
    }

    el.onmousedown = (e) => {
        isDragging = true; startX = e.pageX;
        scrollLeft = currentX;
        el.style.cursor = 'grabbing';
    };
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.pageX - startX;
        let newX = scrollLeft + dx;
        newX = Math.max(-getMaxScroll(), Math.min(0, newX));
        currentX = newX;
        track.style.transform = `translateX(${newX}px)`;
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
        el.style.cursor = 'grab';
    });

    // Touch support
    el.ontouchstart = (e) => {
        isDragging = true; startX = e.touches[0].pageX;
        scrollLeft = currentX;
    };
    el.ontouchmove = (e) => {
        if (!isDragging) return;
        const dx = e.touches[0].pageX - startX;
        let newX = scrollLeft + dx;
        newX = Math.max(-getMaxScroll(), Math.min(0, newX));
        currentX = newX;
        track.style.transform = `translateX(${newX}px)`;
    };
    el.ontouchend = () => { isDragging = false; };
}


/* ==========================================================
   LESSON BOOK VIEWER
   ========================================================== */
function openLesson(chapterId) {
    const pages = LESSON_PAGES[chapterId];
    if (!pages) return;
    currentLessonPage = 0;
    totalLessonPages = pages.length;

    // Build pages
    lessonBook.innerHTML = '';
    pages.forEach((html, i) => {
        const page = document.createElement('div');
        page.className = 'lesson-page' + (i === 0 ? ' active' : ' next');
        page.innerHTML = html;
        lessonBook.appendChild(page);
    });

    updateLessonNav();
    setupTableTranslations();

    fadeOverlay.classList.add('active');
    setTimeout(() => {
        contentPage.classList.remove('visible');
        lessonViewer.classList.add('visible');
        setTimeout(() => fadeOverlay.classList.remove('active'), 200);
    }, 600);
}

function updateLessonNav() {
    lessonPageInd.textContent = `Page ${currentLessonPage + 1} / ${totalLessonPages}`;
    lessonPrev.disabled = currentLessonPage === 0;
    lessonNext.disabled = currentLessonPage === totalLessonPages - 1;
}

function flipPage(dir) {
    const pages = lessonBook.querySelectorAll('.lesson-page');
    const old = currentLessonPage;
    currentLessonPage += dir;
    currentLessonPage = Math.max(0, Math.min(totalLessonPages - 1, currentLessonPage));
    if (old === currentLessonPage) return;

    pages.forEach((p, i) => {
        p.classList.remove('active', 'prev', 'next');
        if (i < currentLessonPage) p.classList.add('prev');
        else if (i === currentLessonPage) p.classList.add('active');
        else p.classList.add('next');
    });
    updateLessonNav();
}

lessonPrev.addEventListener('click', () => flipPage(-1));
lessonNext.addEventListener('click', () => flipPage(1));

lessonBackBtn.addEventListener('click', () => {
    fadeOverlay.classList.add('active');
    setTimeout(() => {
        lessonViewer.classList.remove('visible');
        contentPage.classList.add('visible');
        setTimeout(() => fadeOverlay.classList.remove('active'), 200);
    }, 600);
});


/* ==========================================================
   NAVIGATION
   ========================================================== */
backBtn.addEventListener('click', () => {
    fadeOverlay.classList.add('active');
    setTimeout(() => {
        contentPage.classList.remove('visible');
        creditsFooter.style.zIndex = '100';
        bookOverlay.classList.add('visible');
        setTimeout(() => { fadeOverlay.classList.remove('active'); book.classList.add('open'); }, 200);
    }, 600);
});

navManual.addEventListener('click', (e) => {
    e.preventDefault();
    if (lessonViewer.classList.contains('visible')) {
        fadeOverlay.classList.add('active');
        setTimeout(() => { lessonViewer.classList.remove('visible'); contentPage.classList.remove('visible'); creditsFooter.style.zIndex='100'; openBook('manual'); setTimeout(()=>fadeOverlay.classList.remove('active'),200); },500);
    } else if (contentPage.classList.contains('visible')) {
        fadeOverlay.classList.add('active');
        setTimeout(() => { contentPage.classList.remove('visible'); creditsFooter.style.zIndex='100'; openBook('manual'); setTimeout(()=>fadeOverlay.classList.remove('active'),200); },500);
    } else if (currentBookType === 'manual') return;
    else { if (bookOverlay.classList.contains('visible')){ book.classList.remove('open'); setTimeout(()=>openBook('manual'),400);} else openBook('manual'); }
});

navBuilding.addEventListener('click', (e) => {
    e.preventDefault();
    if (lessonViewer.classList.contains('visible')) {
        fadeOverlay.classList.add('active');
        setTimeout(() => { lessonViewer.classList.remove('visible'); contentPage.classList.remove('visible'); creditsFooter.style.zIndex='100'; openBook('building'); setTimeout(()=>fadeOverlay.classList.remove('active'),200); },500);
    } else if (contentPage.classList.contains('visible')) {
        fadeOverlay.classList.add('active');
        setTimeout(() => { contentPage.classList.remove('visible'); creditsFooter.style.zIndex='100'; openBook('building'); setTimeout(()=>fadeOverlay.classList.remove('active'),200); },500);
    } else if (currentBookType === 'building') return;
    else { if (bookOverlay.classList.contains('visible')){ book.classList.remove('open'); setTimeout(()=>openBook('building'),400);} else openBook('building'); }
});

btnManual.addEventListener('click', (e) => { e.preventDefault(); openBook('manual'); });
btnBuilding.addEventListener('click', (e) => { e.preventDefault(); openBook('building'); });
bookCloseBtn.addEventListener('click', closeBook);
bookCoverFront.addEventListener('click', () => { if (!book.classList.contains('open')) book.classList.add('open'); });

navHome.addEventListener('click', () => {
    fadeOverlay.classList.add('active');
    setTimeout(() => {
        lessonViewer.classList.remove('visible');
        contentPage.classList.remove('visible');
        bookOverlay.classList.remove('visible');
        book.classList.remove('open');
        creditsFooter.style.zIndex='100';
        introSection.classList.remove('hidden');
        navManual.classList.add('active');
        navBuilding.classList.remove('active');
        currentBookType = null;
        setTimeout(()=>fadeOverlay.classList.remove('active'),200);
    },500);
});

// Keyboard navigation for lessons
document.addEventListener('keydown', (e) => {
    if (!lessonViewer.classList.contains('visible')) return;
    if (e.key === 'ArrowRight') flipPage(1);
    if (e.key === 'ArrowLeft') flipPage(-1);
});


/* ==========================================================
   3D SAKURA PETALS
   ========================================================== */
const canvas = $('sakura-canvas');
const ctx = canvas.getContext('2d');
let W, H;
const petals = [];
const PETAL_COUNT = 50;

function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

const petalColors = [
    'rgba(244,114,182,.55)','rgba(249,168,212,.45)','rgba(252,231,243,.4)',
    'rgba(236,72,153,.3)','rgba(251,207,232,.45)','rgba(167,139,250,.25)'
];

class Petal {
    constructor() { this.reset(true); }
    reset(init=false) {
        this.x = Math.random()*W; this.y = init?Math.random()*H:-20;
        this.z = Math.random()*3+1;
        this.size = (Math.random()*8+6)*(this.z/3);
        this.speedY = (Math.random()*.6+.3)*(this.z/2);
        this.speedX = (Math.random()-.5)*.8;
        this.rotation = Math.random()*Math.PI*2;
        this.rotationSpeed = (Math.random()-.5)*.03;
        this.rotationX = Math.random()*Math.PI;
        this.rotationXSpeed = (Math.random()-.5)*.02;
        this.wobblePhase = Math.random()*Math.PI*2;
        this.wobbleSpeed = Math.random()*.02+.01;
        this.color = petalColors[Math.floor(Math.random()*petalColors.length)];
        this.opacity = (Math.random()*.5+.3)*(this.z/4);
    }
    update() {
        this.wobblePhase += this.wobbleSpeed;
        this.x += this.speedX + Math.sin(this.wobblePhase)*.5;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.rotationX += this.rotationXSpeed;
        if (this.y>H+20||this.x<-30||this.x>W+30) this.reset();
    }
    draw() {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.rotation);
        ctx.scale(1,Math.abs(Math.cos(this.rotationX))*.8+.2);
        ctx.globalAlpha=this.opacity;
        ctx.beginPath(); ctx.fillStyle=this.color;
        const s=this.size;
        ctx.moveTo(0,0);
        ctx.bezierCurveTo(s*.3,-s*.4,s*.7,-s*.5,s*.5,0);
        ctx.bezierCurveTo(s*.7,s*.5,s*.3,s*.4,0,0);
        ctx.moveTo(0,0);
        ctx.bezierCurveTo(-s*.3,-s*.4,-s*.7,-s*.5,-s*.5,0);
        ctx.bezierCurveTo(-s*.7,s*.5,-s*.3,s*.4,0,0);
        ctx.fill();
        ctx.beginPath(); ctx.fillStyle='rgba(255,255,255,.15)';
        ctx.arc(0,-s*.1,s*.15,0,Math.PI*2); ctx.fill();
        ctx.restore();
    }
}
for (let i=0;i<PETAL_COUNT;i++) petals.push(new Petal());
petals.sort((a,b)=>a.z-b.z);
function animatePetals() {
    ctx.clearRect(0,0,W,H);
    for (const p of petals){p.update();p.draw();}
    requestAnimationFrame(animatePetals);
}
animatePetals();


/* ==========================================================
   TECH PARTICLES
   ========================================================== */
const particleContainer = $('tech-particles');
const techSymbols = ['SELECT','INSERT','UPDATE','DELETE','JOIN','WHERE','FROM','CREATE','TABLE','INDEX','VIEW','ALTER','{  }','< />','0101','NULL','KEY'];
const techStyle = document.createElement('style');
techStyle.textContent = `@keyframes techFloat{0%{transform:translateY(-30px) rotate(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(${window.innerHeight+50}px) rotate(8deg);opacity:0}}`;
document.head.appendChild(techStyle);
for (let i=0;i<18;i++){
    const el=document.createElement('div');
    el.textContent=techSymbols[Math.floor(Math.random()*techSymbols.length)];
    el.style.cssText=`position:absolute;left:${Math.random()*100}%;top:-30px;font-family:'Courier New',monospace;font-size:${Math.random()*4+10}px;font-weight:600;color:rgba(167,139,250,${Math.random()*.1+.04});pointer-events:none;animation:techFloat ${Math.random()*25+20}s linear ${Math.random()*15}s infinite;white-space:nowrap;user-select:none`;
    particleContainer.appendChild(el);
}


/* ==========================================================
   PARALLAX & RIPPLES
   ========================================================== */
const floatIcons = document.querySelectorAll('.float-icon');
document.addEventListener('mousemove', (e)=>{
    const x=(e.clientX/W-.5)*2, y=(e.clientY/H-.5)*2;
    floatIcons.forEach((icon,i)=>{const f=(i+1)*8; icon.style.transform=`translate(${x*f}px,${y*f}px)`;});
});

const ripStyle = document.createElement('style');
ripStyle.textContent = `@keyframes rippleEffect{to{transform:scale(40);opacity:0}}`;
document.head.appendChild(ripStyle);
document.querySelectorAll('.nav-link').forEach(link=>{
    link.addEventListener('click',(e)=>{
        const r=document.createElement('span');
        r.style.cssText=`position:absolute;width:5px;height:5px;border-radius:50%;background:rgba(244,114,182,.4);transform:scale(0);animation:rippleEffect .6s ease-out forwards;left:${e.offsetX}px;top:${e.offsetY}px`;
        link.appendChild(r); setTimeout(()=>r.remove(),600);
    });
});

})();
