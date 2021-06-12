These files are the code I've written in Google Apps Script to convert CSV files that are exported from SAP Litmos.  Litmos is a learning management system (LMS) with the capability to export reports about the status of learners and courses.  These scripts convert those raw reports into a selected format to highlight desired fields for various use cases.  

The "Examples" folder contains the raw reports exported from the LMS.  Each "Scripts" file is how I broke up the scripts based on what they pertained to. All files could be combined into one and still function, but for ease of understanding I decided to write them as individual files.

Instructions: 
	1) Open Google Sheets
	2) Add "Scripts" files to Scripts
		a. Tools -> Script editor
		b. Create new ".gs" files in Google editor
		c. Paste code from each file in "Scripts" folder to files in editor
		d. Run "onOpen" from "Code.gs" -OR- reload the spreadsheet
	3) Import one of the "Example" CSV files (take note of report type)
		a. File -> Import -> Upload
		b. Upload file(s)
		c. Change "Import location" to "Insert new sheets(s)"
		d. Import Data
	4) Select "RM Tools" in the menu bar
	5) Perform desired action on report
		 It is recommended to match report type to function.
