
# Search Gene Data

Searches gene data based upon supplied criteria.

### How to use
1. Choose the field you'd like to filter by, either _name_ or _chromosome_.
2. Enter a value into the input box.  Once you enter a value with a length greater than 3 characters, you'll see the option to initiate your search.
3. Sort the resulting dataset by clicking the column headers.
4. If you wish, clear the search by clicking the _(X)_ and starting again.

### Deployment instructions
#### Installing server dependencies
Ensure that you have pip installed.  If not, type `sudo easy_install pip`.

The most straightforward method for installing the server dependencies is to navigate to the root of the Django project, then enter `pip install -r requirements.txt`.

#### Installing client dependencies
Navigate to the root directory.
Run `npm install`.

#### Running the project
Open up 2 console windows.  In the first, navigate to the root of the Django project and type `python manage.py runserver`.  In the second, in the root of the project, enter `webpack -w`.

### Design choices
Aside from the use of React, perhaps the biggest design choice involved the use of Griddle--a grid component implemented in React.  The data and the functionality desired (sorting, paging) lends itself well to a grid, and frankly there's reason to reinvent a solution when perfectly good and vetted solutions already exist.

### To dos
1. Add export functionality, as a `.csv`, `.xls`, or `.json` file.
2. Add filtering on a resulting dataset.

### Screenshots
![Before search](/resources/screenshot00.png?raw=true "Before search")
![After search](/resources/screenshot01.png?raw=true "Before search")
