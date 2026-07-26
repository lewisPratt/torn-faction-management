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
* View past ranked war opponents and war results, including score and war length.
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
* Store faction member war data locally, to enable visualization of performance over multiple wars (using line charts)

  
  ## Planned features

* Grouping of faction member rows based on criteria (grouping underperforming member rows together)
* Detailed Chain report for each war
* Removal of all cached data
* Add export data option to export war data as CSV/spreadsheet format

## Feature Breakdown

### Local API storage
<hr>
To keep this app lightweight and secure, your API key is stored in your browser cache, just like a cookie. Your api key doesn't get stored in a database and can be easily deleted at any time from within the app. 
If you're interested, open the app in google chrome, open developer tools and go to the application tab, then Local Storage. You'll be able to see all the data stored by the app in your browser cache. 

BE AWARE that deleting your browser cache will remove any data you had stored by the app. It's not gone forever as you can easily re-download the datasets, but it would be a pain to do if the deletion was unintentional! 

ALSO BE AWARE that there is no hard and fast rule determining how much data can be stored in your browser cache. It can vary per device and per browser. During testing i have not hit any size limit on the amount of data i have stored but if you are storing the equivalent of the Internet Archive, you can expect to hit a limit at some point. Due to the very small size of the datasets stored by the app, it's highly unlikely you'll encounter any issue with this. 


### Storing individual faction member datasets
<hr>

On war reports, you will have the option to download the dataset for individual faction members for that war. (how many attacks a faction member undertook, number of Xanax taken etc)

As you store datasets for the same faction member over multiple wars, the line chart that appears on their war report row, will visualize their performance over the course of the wars currently stored locally. 

It's a great way to focus in on specific members of a faction and drill down on how much they are contributing (or hindering) the factions efforts during wartime. 

![Report row example](https://raw.githubusercontent.com/lewisPratt/torn-faction-management/refs/heads/main/src/assets/readme/report-row-example.png "Example of war report member row")

