# Torn Faction Ledger
A tool for faction leaders to dig deeper into member participation and resource use during ranked wars. 
A few years ago i made a similar tool using Google sheets. (cumbersome and hard to share with the community)

I decided to revisit the project in an effort to familiarize myself with React and other web technologies. 

Still in development. 

Built to learn React. 

Not vibe coded.

[Live App](https://lewispratt.github.io/torn-faction-management/)

## Current Features
* Local API key storage, no remote processing or maniuplation of torn account access. 
* View past ranked war opponents and war results, including points and war length.
* Produce war report breakdown that gives an overview of:
  * Compact and quick to reference faction member stats
  * Faction member attack participation (war attacks/outside attacks/overall attack  % contribution)
  * Faction member armoury item usage (Xanax, meds and ipecac usage during war period/up to two days before war starts)
  * Convenient links to members profile or to message a member directly from the report
  * member activity, donator status and level 
  * Visual representation of attack participation (horizontal progress bar on each row)
  * War report bar chart generated with multiple datasets, allowing comparison of different aspects of faction member activity during ranked wars.
  * Optional legend to explain the meaning of data in each row
  * Calculation of expected attacks for each member based on faction Xanax used
  * Visual indicator when a user has not achieved their expected attack performance.
  * Calculation of total Xanax cost for the war (based on relative current average Xanax price) 
* DARK MODE!
  
  ## Planned features

* Store faction member war data locally, to enable visualization of performance over multiple wars (using line/bar charts)
* Grouping of faction member rows based on criteria (grouping underperforming member rows together)
* Detailed Chain report for each war
* Improved structure of locally stored data
* Removal of all cached data
* Add export data option to export war data as CSV/spreadsheet format