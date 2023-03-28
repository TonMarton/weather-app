import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { capitalsApi } from '../services/capitals';
import { store } from '../store';
import { geocodingApi } from '../services/geocoding';
import { weatherApi } from '../services/weather';
import { Coordinate, Weather } from '../types';

export async function newCapitalLoader() {
  const promise = store.dispatch(
    capitalsApi.endpoints.getCapitals.initiate(null),
  );
  try {
    const capitals = await promise.unwrap();
    const { savedCapitals } = store.getState().reducer;
    return capitals.filter((capital) => !savedCapitals.includes(capital));
  } catch (e) {
    return redirect('/');
  } finally {
    promise.unsubscribe();
  }
}

export async function weatherLoader({ params }: LoaderFunctionArgs) {
  const capitalName = params.capital as string;
  const isCapitalSaved = store
    .getState()
    .reducer.savedCapitals.includes(capitalName);

  if (!isCapitalSaved) {
    // TODO: dispatch exception action
    return redirect('/');
  }

  let coordinates: Coordinate;
  let weather: Weather;

  const coordinatesPromise = store.dispatch(
    geocodingApi.endpoints.getCapitalCoordinates.initiate(capitalName),
  );
  try {
    coordinates = await coordinatesPromise.unwrap();
  } catch (e) {
    return redirect('/');
  } finally {
    coordinatesPromise.unsubscribe();
  }
  const weatherPromise = store.dispatch(
    weatherApi.endpoints.getWeatherByLocation.initiate(coordinates),
  );
  try {
    weather = await weatherPromise.unwrap();
  } catch (e) {
    return redirect('/');
  } finally {
    weatherPromise?.unsubscribe();
  }
  return { weather, capitalName };
}
