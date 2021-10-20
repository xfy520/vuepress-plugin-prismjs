export default `
@import '_variables';

pre[class*='language-']::-webkit-scrollbar-track-piece {
  background-color: #f8f8f8;
}
pre[class*='language-']::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
pre[class*='language-']::-webkit-scrollbar-thumb {
  //滚动条的设置
  background-color: #dddddd;
  background-clip: padding-box;
}
pre[class*='language-']::-webkit-scrollbar-thumb:hover {
  background-color: #bbbbbb;
}

code[class*='language-'],
pre[class*='language-'] {
  color: #ccc;
  background: none;
  font-family: var(--font-family-code);
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

/* Code blocks */
pre[class*='language-'] {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
}

:not(pre) > code[class*='language-'],
pre[class*='language-'] {
  background: #2d2d2d;
}

/* Inline code */
:not(pre) > code[class*='language-'] {
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;
}

.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #999;
}

.token.punctuation {
  color: #ccc;
}

.token.tag,
.token.attr-name,
.token.namespace,
.token.deleted {
  color: #ec5975;
}

.token.function-name {
  color: #6196cc;
}

.token.boolean,
.token.number,
.token.function {
  color: #f08d49;
}

.token.property,
.token.class-name,
.token.constant,
.token.symbol {
  color: #f8c555;
}

.token.selector,
.token.important,
.token.atrule,
.token.keyword,
.token.builtin {
  color: #cc99cd;
}

.token.string,
.token.char,
.token.attr-value,
.token.regex,
.token.variable {
  color: #7ec699;
}

.token.operator,
.token.entity,
.token.url {
  color: #67cdcc;
}

.token.important,
.token.bold {
  font-weight: bold;
}
.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

.token.inserted {
  color: #3eaf7c;
}

// ===============================

.theme-default-content {
  pre,
  pre[class*='language-'] {
    line-height: 1.4;
    padding: 1.25rem 1.5rem;
    margin: 0.85rem 0;
    border-radius: 6px;
    overflow: auto;

    code {
      color: #fff;
      padding: 0;
      background-color: transparent;
      border-radius: 0;
      -webkit-font-smoothing: auto;
      -moz-osx-font-smoothing: auto;
    }
  }

  .line-number {
    font-family: var(--font-family-code);
  }
}

div[class*='language-'] {
  position: relative;
  background-color: var(--code-bg-color);
  border-radius: 6px;

  &::before {
    position: absolute;
    z-index: 3;
    top: 0.8em;
    right: 1em;
    font-size: 0.75rem;
    color: var(--code-ln-color);
  }

  pre,
  pre[class*='language-'] {
    // force override the background color to be compatible with shiki
    background: transparent !important;
    position: relative;
    z-index: 1;
  }

  .highlight-lines {
    user-select: none;
    padding-top: 1.3rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 1.4;

    .highlight-line {
      background-color: var(--code-hl-bg-color);
    }
  }

  &:not(.line-numbers-mode) {
    .line-numbers {
      display: none;
    }
  }

  &.line-numbers-mode {
    .highlight-lines .highlight-line {
      position: relative;

      &::before {
        content: ' ';
        position: absolute;
        z-index: 2;
        left: 0;
        top: 0;
        display: block;
        width: var(--code-ln-wrapper-width);
        height: 100%;
      }
    }

    pre {
      margin-left: var(--code-ln-wrapper-width);
      padding-left: 1rem;
      vertical-align: middle;
    }

    .line-numbers {
      position: absolute;
      top: 0;
      width: var(--code-ln-wrapper-width);
      text-align: center;
      color: var(--code-ln-color);
      padding-top: 1.25rem;
      line-height: 1.4;

      br {
        user-select: none;
      }

      .line-number {
        position: relative;
        z-index: 3;
        user-select: none;
        font-size: 0.85em;
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: var(--code-ln-wrapper-width);
      height: 100%;
      border-radius: 6px 0 0 6px;
      border-right: 1px solid var(--code-hl-bg-color);
    }
  }
}

@each $lang in $codeLang {
  div[class*='language-'].ext-#{$lang} {
    &:before {
      content: '' + $lang;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .theme-default-content {
    div[class*='language-'] {
      margin: 0.85rem -1.5rem;
      border-radius: 0;
    }
  }
}`;
