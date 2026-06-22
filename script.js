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
         <h3><span class="h3-icon">#</span> Integer Types</h3>
         <p>Integers store whole numbers. The main difference between them is the <strong>range of values</strong> they can hold:</p>
         <table class="compare-table">
            <tr><th>Type</th><th>Size</th><th>Range</th><th>Use Case</th></tr>
            <tr><td><code>TINYINT</code></td><td>1 byte</td><td>0 to 255</td><td>Age, status flags</td></tr>
            <tr><td><code>SMALLINT</code></td><td>2 bytes</td><td>−32,768 to 32,767</td><td>Year, small counters</td></tr>
            <tr><td><code>INT</code></td><td>4 bytes</td><td>−2.1B to 2.1B</td><td>IDs, quantities (most used)</td></tr>
            <tr><td><code>BIGINT</code></td><td>8 bytes</td><td>±9.2 quintillion</td><td>Large counters, timestamps</td></tr>
         </table>
         <h3><span class="h3-icon">%</span> Decimal / Floating Types</h3>
         <table class="compare-table">
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
         <table class="compare-table">
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
         <table class="compare-table">
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
            <table class="compare-table" style="margin:0">
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
         <table class="compare-table">
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
         <table class="compare-table">
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
         <table class="compare-table">
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
    ]
};


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
