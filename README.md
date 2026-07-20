# Torn Faction Ledger
A tool for faction leaders to dig deeper into member participation and resource use during ranked wars. 

Still in early development.

[Live App](https://lewispratt.github.io/torn-faction-management/)

## Current Features
* Local API key storage, no remote processing or maniuplation of torn account access. 
* View past ranked war opponents and war results, including points and war length.
* Produce war report breakdown that gives an overview of:
  * Faction member attack participation (war attacks/outside attacks/overall attack  % contribution)
  * Faction member armoury item usage (Xanax, meds and ipecac usage during war period/up to two days before war starts)
  * Convenient links to members profile or to message a member directly from the report
  * member activity, donator status and level 
  * Visual representation of attack participation (horizontal progress bar on each row)
  * Optional legend to explain the meaning of data in each row
  * Calculation of expected attacks for each member based on faction Xanax used
  *  Visual indicator when a user has not achieved their expected attack performance.
  *  Calculation of total Xanax cost for the war (based on relative current average Xanax price) 
  
  ## Planned features

* Store faction member war data locally, to enable visualization of performance over multiple wars (using line/bar charts)
* Grouping of faction member rows based on criteria (grouping underperforming member rows together)
* Detailed Chain report for each war
* Improved structure of locally stored data
* Removal of all cached data
* Improved mobile friendly styling 