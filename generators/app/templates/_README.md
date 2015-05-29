## Requirements
- ruby https://www.ruby-lang.org/en/
- sass --version 3.4.14 http://sass-lang.com/
- sass-globbing --version 1.1.0 https://github.com/chriseppstein/sass-globbing !there are issues with version 1.1.1 use 1.1.0


### Grunt

- grunt postcss autoprefixer https://github.com/ai/browserslist


##Directory structure:

```
.
├── .bowerrc
├── .gitignore
├── Gruntfile.js
├── README.md
├── development
│   ├── index.html
│   └── styles
│       ├── .DS_Store
│       └── sass
│           ├── .DS_Store
│           ├── base
│           │   ├── .DS_Store
│           │   ├── _fonts.scss
│           │   ├── _meyer-reset.scss
│           │   └── _normalize.scss
│           ├── helpers
│           │   ├── .DS_Store
│           │   ├── _mixins.scss
│           │   └── _variables.scss
│           ├── layout
│           │   └── _global.scss
│           └── screen.scss
├── jshintrc
├── node_modules
└── package.json
```

##General
use tabs width: 4

##SASS / SCSS
For compiling the scss code a grunt task is used 'sass_compile'

###SASS directory structure
```
sass/ 
| 
|– base/ 
|   |– _reset.scss       # Reset/normalize 
|   |– _typography.scss  # Typography rules 
|   ...                  # Etc… 
| 
|– components/ 
|   |– _buttons.scss     # Buttons 
|   |– _carousel.scss    # Carousel 
|   |– _cover.scss       # Cover 
|   |– _dropdown.scss    # Dropdown 
|   |– _navigation.scss  # Navigation 
|   ...                  # Etc… 
| 
|– helpers/ 
|   |– _variables.scss   # Sass Variables 
|   |– _functions.scss   # Sass Functions 
|   |– _mixins.scss      # Sass Mixins 
|   |– _helpers.scss     # Class & placeholders helpers 
|   ...                  # Etc… 
| 
|– layout/ 
|   |– _grid.scss        # Grid system 
|   |– _header.scss      # Header 
|   |– _footer.scss      # Footer 
|   |– _sidebar.scss     # Sidebar 
|   |– _forms.scss       # Forms 
|   ...                  # Etc… 
| 
|– pages/ 
|   |– _home.scss        # Home specific styles 
|   |– _contact.scss     # Contact specific styles 
|   ...                  # Etc… 
| 
|– themes/ 
|   |– _theme.scss       # Default theme 
|   |– _admin.scss       # Admin theme 
|   ...                  # Etc… 
| 
|– vendors/ 
|   |– _bootstrap.scss   # Bootstrap 
|   |– _jquery-ui.scss   # jQuery UI 
|   ...                  # Etc… 
| 
| 
`– screen.scss             # primary Sass file 
```

###SASS styleguide
collection css styleguides https://css-tricks.com/css-style-guides/

This guide is inspired by https://css-tricks.com/sass-style-guide/

1. Be consistant with indentation
2 .Be consistant about where spaces before/after colons/braces go
3. One selector per line, One rule per line
4. List related properties together
5. Have a plan for class name naming
6. Don't use ID's #hotdrama
7. etc

Stay on the road:
- List @extend(s) First
- List @include(s) Next
- List "Regular" Styles Next
- Nested Selectors Next
- Nested Pseudo Classes and Pseudo Elements Last 

```
.weather {
  @extend %module; 
  @include transition(all 0.3s ease);
  background: LightCyan;
  > h3 {
    @include transform(rotate(90deg));
    border-bottom: 1px solid white;
  }
  &:hover {
    background: DarkCyan;
  }
  &::before {
    content: "";
    display: block;
  }
}
```

Maximum Nesting: Three Levels Deep
```
.weather {
  .cities {
    li {
      // no more!
    }
  }
}
```
Maximum Nesting: 50 Lines

Break Into As Many Small Files As Makes Sense

Don't Even Commit .css Files

Be Generous With Comments
```
.overlay {
  // modals are 6000, saving messages are 5500, header is 2000
  z-index: 5000; 
}
```

Variablize All Common Numbers, and Numbers with Meaning
```
$zHeader: 2000;
$zOverlay: 5000;
$zMessage: 5050;

.header {
  z-index: $zHeader;
}
.overlay {
  z-index: $zOverlay;
}
.message {
  z-index: $zMessage;
}
```
Variables are stored in '_variables.scss' except specific variables in components
```
.accordion {
  $accordion-header-color: $primary-color;
  $accordion-padding: 1em;
  
  @extend %module;
  @include transition(all 0.3s ease-out);
  background: $accordion-header-color;
  padding: $accordion-padding;
}
```