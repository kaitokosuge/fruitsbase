export type EditorObject =
    | {
          id: string;
          data: {
              code: string;
          };
      }
    | {
          id: string;
          data: {
              text: string;
          };
      };
